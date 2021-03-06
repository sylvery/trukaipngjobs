var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	image: { type: Types.CloudinaryImage },
	name: { type: Types.Text, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	bio: { type: Types.Text, initial: true, required: false },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Dashboard Access', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'User', path: 'users', refPath: 'newUser' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
