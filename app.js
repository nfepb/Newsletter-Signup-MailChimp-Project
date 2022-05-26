const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "5b36064f009c58500a6ad153e825ae93-us10",
  server: "us10"
});
const listId = "d875a29311";

const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
// Check to make sure data is being logged. Works so far
  // console.log(firstName, lastName, email)

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  //Uploading the data to the server
  const run = async () => {
    try {
      const response = await client.list.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      })
      console.log(response)
      res.sendFile(__dirname + "/success.html");
    } catch(e) {
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});

// Redirect to the home directory if user clicks on failure button
app.post("/failure", (req, res) => {
  res.redirect("/");
});



app.listen(3000, () => {
  console.log("Server is running on port 3000")
});
