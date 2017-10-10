/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	User: [
		{ 'name':'Sylver', 'email': 'sylver@trend.media', 'password': 'p@$zw0rD!', 'isAdmin': true },
		{ 'name':'Digicel', 'email': 'digicel@jobs.com', 'password': 'password', 'isAdmin': false },
		{ 'name':'Chemica', 'email': 'chemica@trend.media', 'password': 'password', 'isAdmin': false },
		{ 'name':'Tablebirds', 'email': 'tablebirds@trend.media', 'password': 'password', 'isAdmin': false },
		{ 'name':'Nari', 'email': 'nari@trend.media', 'password': 'password', 'isAdmin': false },
		{ 'name':'Customs', 'email': 'customs@trend.media', 'password': 'password', 'isAdmin': false },
		{ 'name':'Naqia', 'email': 'naqia@trend.media', 'password': 'password', 'isAdmin': false },
	],
	JobCategory: [
			{ 'name': 'ICT' },
			{ 'name': 'Marketing' },
			{ 'name': 'Accounting' },
			{ 'name': 'Human Resources' },
			{ 'name': 'Administration' },
			{ 'name': 'Agriculture' },
			{ 'name': 'Construction' },
			{ 'name': 'Aviation' },
			{ 'name': 'Marine' },
			{ 'name': 'Engineering' },
		],
};

/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone');
var async = require('async');
var User = keystone.list('User');

var admins = [
	{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin (admin, done) {

	var newAdmin = new User.model(admin);

	newAdmin.isAdmin = true;
	newAdmin.save(function (err) {
		if (err) {
			console.error('Error adding admin ' + admin.email + ' to the database:');
			console.error(err);
		} else {
			console.log('Added admin ' + admin.email + ' to the database.');
		}
		done(err);
	});

}

exports = module.exports = function (done) {
	async.forEach(admins, createAdmin, done);
};

*/
