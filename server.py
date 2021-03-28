from flask import Flask, render_template, request, redirect, flash, session, url_for, jsonify
import os
import util
import data_manager


app = Flask(__name__)
app.secret_key = os.urandom(16)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        users = data_manager.get_usernames()
        for user in users:
            if user['username'] == request.form['username']:
                error = 'Username already exists, please choose another one!'
                return render_template('registration.html', error=error)
        if request.form['username'] and request.form['password']:
            password = util.hash_password(request.form['password'])
            user = {'username': request.form['username'], 'password': password}
            data_manager.add_new_user(user)
            flash('Successful registration. Log in to continue.')
            return redirect('/login')
        else:
            error = 'Please, fill in both fields.'
            return render_template('registration.html', error=error)
    return render_template('registration.html')
    

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if util.verify_password(password, data_manager.get_password(username)['password']):
            session['username'] = username
            flash('You were just logged in')
            return redirect('/')
        else:
            error = 'Wrong username or password.'
            return render_template('login.html', error=error)
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You were just logged out')
    return redirect(url_for('main'))


@app.route('/vote', methods=['POST'])
def voting():
    data = request.get_json()
    time = util.get_submission_time()
    user_id = data_manager.get_user_id(data['user'])['id']
    vote = {'planet_id': data['planetId'], 'planet_name': data['name'], 'user_id': user_id, 'submission_time': time}
    data_manager.add_vote(vote)
    return 'thanks'


@app.route('/get_votes')
def get_votes():
    votes = data_manager.get_votes()
    return jsonify(votes)


if __name__ == '__main__':
    app.run()
