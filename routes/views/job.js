var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'job';
	locals.filters = {
		job: req.params.job,
	};
	locals.data = {
		jobs: [],
		categories: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('JobCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Job').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.jobCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});


	// Load the current job
	view.on('init', function (next) {

		var q = keystone.list('Job').model.findOne({
			state: 'published',
			slug: locals.filters.job,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.job = result;
			next(err);
		});

	});

	// Load other jobs
	view.on('init', function (next) {

		var q = keystone.list('Job').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.jobs = results;
			next(err);
		});

	});

	// Render the view
	view.render('job');
};
