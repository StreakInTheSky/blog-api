const chai = require('chai');
const chaiHTTP = require('chai-http')
const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHTTP);

describe ('BlogPosts', function() {
	before(function() {
		return runServer();
	});
	after(function() {
		return closeServer();
	});

	it('should show posts on GET', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.an('array');
				const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
				res.body.forEach(function(item) {
					item.should.be.a('object');
					item.should.include.keys(expectedKeys);
				});
			});
	});

	it('should post new post on POST', function() {
		const newPost = {
			title: 'Test',
			content: 'This is only a test',
			author: 'Test maker'
		}

		return chai.request(app)
			.post('/')
			.send(newPost)
			.then(function(res) {
				res.should.have.status(200);
				res.body.should.be.an('object');
				Object.keys(newPost).forEach(function(key) {
					res.body[key].should.exist;
				});
			});
	});

	it('should delete post on DELETE', function() {
		return chai.request(app)
			.get('/')
			.then(function(res) {
				return chai.request(app)
					.delete('/')
					.send({id: res.body[0].id})
			})
			.then(function(res) {
				res.should.have.status(204);
			})
	})

	it('should update a post on PUT', function() {
		const updatedPost = {
			title: 'Updated'
		}
		return chai.request(app)
			.get('/')
			.then(function(res) {
				updatedPost.id = res.body[0].id
				return chai.request(app)
					.put('/')
					.send(updatedPost)
			})
			.then(function(res) {
				res.should.have.status(200);
				res.body.title.should.equal('Updated');
			})
	})
});