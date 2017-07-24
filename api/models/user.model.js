module.exports = function(sequelize, DataType){
	return sequelize.define('user',{
		nama_user: DataType.STRING,
		email_user: { type: DataType.STRING, unique: true, isEmail: true },
		password_user: DataType.STRING,
		role_user: DataType.ENUM('superadmin', 'admin'),
		forgot_pass_user: { type: DataType.BOOLEAN, defaultValue: false }
		token_forgot_pass_user: { type: DataType.TEXT, defaultValue: null }
	}, {
		getterMethode: {
			getNama: function() {
				return this.getDataValue('nama_user');
			},
			getEmail: function() {
				return this.getDataValue('email_user');
			},
			getPassword: function() {
				return this.getDataValue('password_user');
			},
			getRole: function() {
				return this.getDataValue('role_user');
			},
			getForgotPass: function() {
				return this.getDataValue('forgot_pass_user');
			},
			getTokenForgotPass: function() {
				return this.getDataValue('token_forgot_pass_user');
			}
		},
		setterMethode: {
			setNama: function(nama) {
				return this.getDataValue('nama_user', nama);
			},
			setEmail: function(email) {
				return this.getDataValue('email_user', email);
			},
			setPassword: function(password) {
				return this.getDataValue('password_user', password);
			},
			setRole: function(role) {
				return this.getDataValue('role_user', role);
			},
			setForgotPass: function(forgot_pass) {
				return this.getDataValue('forgot_pass_user', forgot_pass);
			},
			setTokenForgotPass: function(token_forgot_pass) {
				return this.getDataValue('token_forgot_pass_user', token_forgot_pass);
			}
		}
	});
}