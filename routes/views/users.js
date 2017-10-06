var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'user';
	locals.filters = {
		user: req.params.user,
	};
	locals.data = {
		users: [],
		jobs: [],
		categories: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('User').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.users = results;

			// Load the counts for each category
			async.each(locals.data.users, function (user, next) {

				keystone.list('Job').model.count().where('categories').in([user.id]).exec(function (err, count) {
					user.jobCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.user) {
			keystone.list('Jobuser').model.findOne({ key: locals.filters.user }).exec(function (err, result) {
				locals.data.user = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the jobs
	view.on('init', function (next) {

		var q = keystone.list('Job').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('user');

		if (locals.data.user) {
			q.where('users').in([locals.data.user]);
		}

		q.exec(function (err, results) {
			locals.data.jobs = results;
			next(err);
		});
	});

	// Render the view
	view.render('jobs');
};
