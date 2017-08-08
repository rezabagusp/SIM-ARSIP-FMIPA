module.exports = function(sequelize, DataType) {
	return sequelize.define('user', {
		nama_user: DataType.STRING,
		email_user: { type: DataType.STRING, unique: true, isEmail: true },
		password_user: DataType.STRING,
		role_user: DataType.ENUM('superadmin', 'admin'),
		lupa_pass_user: { type: DataType.BOOLEAN, defaultValue: false },
		token_lupa_pass_user: { type: DataType.TEXT, defaultValue: null },
		status_user: { type:DataType.BOOLEAN, defaultValue: true }
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
			getLupaPass: function() {
				return this.getDataValue('lupa_pass_user');
			},
			getTokenLupaPass: function() {
				return this.getDataValue('token_lupa_pass_user');
			},
			getStatus: function() {
				return this.getDataValue('status_user');
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
			setLupaPass: function(lupa_pass) {
				return this.getDataValue('lupa_pass_user', lupa_pass);
			},
			setTokenLupaPass: function(token_lupa_pass) {
				return this.getDataValue('token_lupa_pass_user', token_lupa_pass);
			},
			setStatus: function(status) {
				return this.setDataValue('status_user', status);
			}
		}
	});
}