const express = require("express");
const router = express.Router();
const Axios = require("axios");

const _filter = "suite";

// @DESCRIPTION: Get users array
router.get("/", async (req, res) => {
  Axios.get("https://jsonplaceholder.typicode.com/users")
    .then(apiResponse => {
      const users = apiResponse.data;

      /* 1 - Consolidate websites */
      const websites = users.map(u => u.website);

      /* 2 - Consolidate 'name','email','usuarios' in alphabetic order */
      const usersOrdered = users
        .map(u => ({
          name: u.name,
          email: u.email,
          company: u.company.name
        }))
        .sort((a, b) => (a.name > b.name ? 1 : -1));

      /* 3 - Filter Users by address */
      const usersFiltered = users.filter(u => {
        const keys = Object.keys(u.address);
        for (let i = 0; i < keys.length; i++) {
          if (
            typeof u.address[keys[i]] === "string" &&
            u.address[keys[i]].toLowerCase().includes(_filter)
          )
            return true;
        }
        return false;
      });

      return res.send({ websites, usersOrdered, usersFiltered });
    })

    .catch(err => console.log(err));
});

module.exports = app => app.use("", router);
