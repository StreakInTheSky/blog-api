"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {blogPosts} = require('./model');

blogPosts.create('Hello', 'Hello World', 'Ross');
blogPosts.create('Day 1', 'My day was great', 'Ross');

router.get("/", (req, res) => {
	res.json(blogPosts.get());
})

router.post("/", (req, res) => {
	const requiredFields = ['tite', 'content', 'author']
	requiredFields.forEach(field => {
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body.`
			console.error(message)
			return res.status(400).send(message);
		}
	})
	const blogPost = (req.body,title, req.body.content, req.body.author);
	return res.status(200).json(blogPost);
})

router.delete('/:id', (req, res) => {
	blogPosts.delete(req.params.id);
	console.log(`Deleted blog post \`${req.params.ID}\``);
	res.status(204).end();
})

router.put('/:id', (req, res) => {
	const requiredFields = ['tite', 'id'];
	requiredFields.forEach(field => {
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body.`
			console.error(message);
			return res.status(400).send(message);
		}
	});
	if (req.params.id !== req.body.id) {
		const message = (
			`Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating blog post \`${req.params.id}\``);
	const updatedPost = blogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	})
	res.status(204).json(updatedItem);
});

module.exports = router;