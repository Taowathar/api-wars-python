from flask import Flask, render_template, request, session
import os
import util
import data_manager


app = Flask(__name__)
app.secret_key = os.urandom(16)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/registration')
def registration():
    return render_template('registration.html')
    
    
if __name__ == '__main__':
    app.run()
