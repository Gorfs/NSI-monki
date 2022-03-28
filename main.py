from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/' , methods = ['POST', 'GET'])
def index():
  if request.method == 'POST':
    return request
  else:
    return render_template("index.html")

@app.route("/index.html", methods = ['POST', 'GET'])
def index2():
  if request.method == 'POST':
    return request
  else:
    return render_template("index.html")

#this is going to be the section about sql manipulation and how to put it into a website
#todo make the input form for the html file, 
#make the back end that will recieve the variables
#make the sql database for storing the data
#make html file show what is in the database




if  __name__ == "__main__":
  app.run(debug=True)