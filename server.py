from flask import Flask, render_template, request, session
import os
import util


app = Flask(__name__)
app.secret_key = os.urandom(16)


@app.route('/')
def main():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
