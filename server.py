from flask import Flask, render_template, request, redirect, session
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
        if request.form['password'] and request.form['password']:
            password = util.hash_password(request.form['password'])
            user = {'username': request.form['password'], 'password': password}
            data_manager.add_new_user(user)
            return redirect('/')
        else:
            error = 'Please, fill in both fields.'
            return render_template('registration.html', error=error)
    return render_template('registration.html')
    
    
if __name__ == '__main__':
    app.run()
