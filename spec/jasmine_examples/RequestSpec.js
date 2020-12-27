let item_id;
let item_id2;
// var reporters = require('jasmine-reporters');
// var teamCityReporter = new reporters.TeamCityReporter();

// jasmine.configureDefaultReporter(teamCityReporter);
// var nunitXmlReporter = new reporters.NUnitXmlReporter();

// jasmine.addReporter(nunitXmlReporter);
var reporters = require('jasmine-reporters');
var TeamCityReporter = new reporters.TeamCityReporter ({
    savePath: __dirname,
    consolidateAll: false
});
jasmine.getEnv().addReporter(TeamCityReporter)

describe("Upload request", function() {
  var axios = require('axios');
  // var assert = require('assert');
  const token = "k22xIkOEk4UAAAAAAAAAAQGnV7_UHGw6QPS6c49018sc7SeM3fSdgjytRrq0HVff"; 
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // let result_1;
  var config = {
      method: 'post',
      url: 'https://content.dropboxapi.com/2/files/upload',
      headers: { 
       'Dropbox-API-Arg': '{"mode":"add","autorename":true,"mute":false,"path":"/text.sorry.txt"}', 
       'Content-Type': 'application/octet-stream'
     },
      data : {
       binary: "/Users/i5-8600K/api_js_axios/text.sorry.txt"
     }
    };

  it("should successfully upload a file", async function() {
    let response_1;
    

    await axios(config)
      .then( function (response) {
        response_1 = response;
        item_id = response.id;
      })
      .catch(function (error) {
         console.log(error);
      });

  expect(response_1.status).toBe(200);
    
  }, 7000);
});



describe("Get file metadata request", function(){
  var axios = require('axios');
  const token = "k22xIkOEk4UAAAAAAAAAAQGnV7_UHGw6QPS6c49018sc7SeM3fSdgjytRrq0HVff"; 
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  var config = {
       method: 'post',
       url: 'https://api.dropboxapi.com/2/files/get_metadata',
       headers: { 
         'Content-Type': 'application/json', 
         'Authorization': 'Bearer k22xIkOEk4UAAAAAAAAAAQGnV7_UHGw6QPS6c49018sc7SeM3fSdgjytRrq0HVff'
       },
       data : {
        "path":"/text.sorry.txt"
       }
    };

  it("should successfully get the data", async function() {
    let response_2;

    await axios(config)
    .then(function (response) {
      response_2 = response;
    })
    .catch(function (error) {
      console.log(error);
    });

    expect(response_2.status).toBe(200);
    
  }, 7000);

  it("should return same id as the upload request", async function(){
    await axios(config)
    .then(function (response) {
      item_id2 = response.id;
    })
    .catch(function (error) {
      console.log(error);
    });
    expect(item_id2).toBe(item_id);
  });
});



describe("Delete request", function(){
  var axios = require('axios');
  const token = "k22xIkOEk4UAAAAAAAAAAQGnV7_UHGw6QPS6c49018sc7SeM3fSdgjytRrq0HVff"; 
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  it("should successfully delete the file", async function() {
    let response_2;
    var config3 = {
    method: 'post',
    url: 'https://api.dropboxapi.com/2/files/delete_v2',
    headers: { 
    'Authorization': 'Bearer k22xIkOEk4UAAAAAAAAAAQGnV7_UHGw6QPS6c49018sc7SeM3fSdgjytRrq0HVff', 
    'Content-Type': 'application/json'
    },
    data : {
        "path":"/text.sorry.txt"
    }
};

  await axios(config3)
    .then(function (response) {
       response_3 = response;
    })
    .catch(function (error) {
       console.log(error);
    });


  expect(response_3.status).toBe(200);
    
  }, 7000);

});
