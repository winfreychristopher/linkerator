const express = require("express");
const { getAllLinks, createLinks, updateClickCount } = require("../db");
const linksRouter = express.Router();


linksRouter.get("/", async (req, res, next) => {
    try {
        const links = await getAllLinks()
        res.send(links)
    } catch(error) {
        throw error
    }
})

linksRouter.post("/", async (req, res, next) => {
    const { url, comment, date_shared, click_count, tags = [] } = req.body;
    const linkData = {};
    
  
    try {
      linkData.url = url;
      linkData.comment = comment;
      linkData.date_shared = date_shared;
      linkData.click_count = click_count
      linkData.tags = tags;
      console.log(linkData,"AHHHHHHHHHHHHHHHHHHHHH")
      const links = await createLinks(linkData);
      
      console.log(links, "!!!!!!!!!!!!!!!!")
      res.send(links);
    } catch (error) {
      throw error;
    }
  });
  

//update links

linksRouter.patch("/:linkId", async (req, res, next) => {
    const { url, comment, tags = [] } = req.body;
    const { id } = req.params;
    const linkData = {};
  
    if (url) {
      linkData.url = url;
    }
    if (comment) {
      linkData.comment = comment;
    }
    if (tags && tags.length > 0) {
      linkData.tags = tags.trim().split(/\s+/)
    }
  
    try {
      const updatedLinks = await updateLinks({
        id: id,
        url: linkData.url,
        comments: linkData.comment,
      });
      res.send({
        message: 'Link has successfully been updated!',  
        data: updatedLinks});
    } catch (error) {
      throw error;
    }
  });

//update clicks
// need to target the id of the link to update the clicks
linksRouter.patch("/:id/clicks", async (req, res, next) => {
  const {id} = req.params;

  try {
    await updateClickCount(id);
    res.send({
      message: 'added a click'
    })
  } catch (error) {
    throw error;
  }

});



module.exports = linksRouter