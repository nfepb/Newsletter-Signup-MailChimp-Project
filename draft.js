const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing")

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mailchimp.setConfig({
  apiKey: "5b36064f009c58500a6ad153e825ae93-us10",
  server: "us10",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const memberEmail = req.body.email;
  const listId = "d875a29311";

  //Creating an object with the users data
  const subscribingUser = {
    firstName: firstName,
    lastName: secondName,
    email: memberEmail
  };

      //Uploading the data to the server
      async function run() {
          try{
              const response = await mailchimp.lists.addListMember(listId, {
                  email_address: subscribingUser.email,
                  status: "subscribed",
                  merge_fields: {
                      FNAME: subscribingUser.firstName,
                      LNAME: subscribingUser.lastName
                  }
              });
              console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
              res.sendFile(__dirname + "/success.html");
          } catch (e){
              console.log(e.status);
              res.sendFile(__dirname + "/failure.html");
          }

      }
  run();

    //If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html");
 console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
};
//Running the function and catching the errors (if any)
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
);

//       res.sendFile(__dirname + "/success.html");
//       } catch (e) {
//           res.sendFile(__dirname + "/failure.html");
//     }
//   }
//
// run();
//
//   var jsonData = JSON.stringify(data);

  // https.request(url, options, (response) => {})

  // url = "https://us10.api.mailchimp.com/3.0/lists/d875a29311";
  //
  // const options = {
  //   method: "POST",
  //   auth: "nico1:5b36064f009c58500a6ad153e825ae93-us10",
  // }

//   const request = https.request(url, options, (response) => {});
//     response.on("data", (data) => {
//       console.log(JSON.parse(data));
//     });
//
//     request.write(jsonData);
//     request.end();
// });

app.listen(3000, () => {
  console.log("The server is running on port 3000.");
});
