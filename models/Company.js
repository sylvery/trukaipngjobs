var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Company Model
 * ==========
 */
var Company = new keystone.List('Company');

Company.add({
	profileImg: {type: Types.CloudinaryImage },
	name: {type: String},
	slogan: {type: String},
	bio: {type: Types.Text},
})

Company.register();