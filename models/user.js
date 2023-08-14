'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
// const crypto = require('crypto')
// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD_EMAIL
//     }
// });

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static #encrypt = function (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return hash
    };

    //fungsi untuk menambahkan User
    static addUser = async ({ name, nip, password, email, phone, jabatan, dinas, role, status_akun_dinas, surat_permohonan }) => {
      try {
        const encryptedPassword = this.#encrypt(password)
        const user = await this.findOne({ where: {  nip }})
        if (user === null) {
          return this.create({ 
            name: name,
            nip: nip, 
            password: encryptedPassword,
            email: email, 
            phone: phone, 
            jabatan: jabatan,
            dinas: dinas,
            role: role,
            status_akun_dinas: status_akun_dinas,
            surat_permohonan: surat_permohonan }); 
          
        }else{
          return Promise.reject("NIP Telah Terdaftar")
        }
      }
      catch(err) {
        return Promise.reject(err)
      }
    }

    //fungsi untuk delete User
    static deleteUser(id){
      return this.destroy({ where: { id: id } })
    }

    //fungsi untuk update Profile
    static updateProfile({ name, nip, email, phone, jabatan, dinas },id){
      return this.update({ 
        name: name,
        nip: nip, 
        email: email, 
        phone: phone, 
        jabatan: jabatan,
        dinas: dinas }, { where:{id: id} })
    }

    //fungsi untuk update User
    static updateUser({ name, nip, email, phone, jabatan, dinas, role, status_akun_dinas, surat_permohonan },id){
      // const encryptedPassword = this.#encrypt(password)
      return this.update({ 
        name: name,
        nip: nip, 
        // password: encryptedPassword,
        email: email, 
        phone: phone, 
        jabatan: jabatan,
        dinas: dinas,
        role: role,
        status_akun_dinas: status_akun_dinas,
        surat_permohonan: surat_permohonan }, { where:{id: id} })
    }

    //fungsi untuk update User
    // static verified(email_token){
    //   return this.update({ 
    //     email_token: null,
    //     verified: true }, { where:{email_token: email_token} })
    // }

    //fungsi untuk mengambil data User berdasarkan id
    static getUserById(id){
      return this.findOne({ where: { id: id } });
    }

    static getUserByNIP(nip){
      return this.findOne({ where: { nip: nip } });
    }

    static resetPassword({ password },id){
      const encryptedPassword = this.#encrypt(password)
      return this.update({ 
        password: encryptedPassword }, { where:{id: id} })
    }

    static registerAkunDinas({ status_akun_dinas, surat_permohonan },id){
      return this.update({ 
        status_akun_dinas: status_akun_dinas,
        surat_permohonan: surat_permohonan }, { where:{id: id} })
    }

    static approvedAkunDinas({ status_akun_dinas },id){
      return this.update({ 
        status_akun_dinas: status_akun_dinas }, { where:{id: id} })
    }

    checkPassword = password => bcrypt.compareSync(password, this.password)

    /* Method Authenticate, untuk login */
    static authenticate = async ({ nip, password }) => {
      try {
        const user = await this.findOne({ where: {  nip }})
        // console.log(user.role)
        if (!user) {
          console.log('User Not Found with username');
          return Promise.reject("NIP atau password yang anda masukkan salah")
        }
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) {
          console.log('Password salah');
          return Promise.reject("NIP atau password yang anda masukkan salah")
        }
        // const isRoleMember = await this.findOne({ where: {  role }})
        // console.log(user.checkPassword(password))
        if (user.role != 'pegawai') {
          // console.log('Role bukan member');
          return Promise.reject("This acount is not pegawai")
        }
        // if (user.role != 'admin') {
        //   return Promise.reject("This acount is not admin")
        // }
        
        return Promise.resolve(user)
      }
      catch(err) {
        return Promise.reject(err)
      }
    }

    static authenticateAdmin = async ({ nip, password }) => {
      try {
        const user = await this.findOne({ where: {  nip }})
        // console.log(user.role)
        if (!user) {
          console.log('User Not Found with username');
          return Promise.reject("NIP atau password yang anda masukkan salah")
        }
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) {
          console.log('Password salah');
          return Promise.reject("NIP atau password yang anda masukkan salah")
        }
        // const isRoleMember = await this.findOne({ where: {  role }})
        // console.log(user.checkPassword(password))
        if (user.role != 'admin') {
          // console.log('Role bukan admin');
          return Promise.reject("This acount is not admin")
        }
        return Promise.resolve(user)
      }
      catch(err) {
        return Promise.reject(err)
      }
    }

    static changePassword = async ({ nip, oldPassword, newPassword }) => {
      try {
        const user = await this.findOne({ where: {  nip }})
        const isPasswordValid = user.checkPassword(oldPassword)
        if (!isPasswordValid) {
          console.log('Password lama salah');
          return Promise.reject("Password lama yang anda masukkan salah!")
        }else{
          const encryptedPassword = this.#encrypt(newPassword)
          this.update({ password: encryptedPassword }, { where:{nip: nip} })
          return Promise.reject("Password berhasil diubah")
        }
      }
      catch(err) {
        return Promise.reject(err)
      }
    }

  }
  User.init({
    nip: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    dinas: DataTypes.STRING,
    role: DataTypes.STRING,
    status_akun_dinas: DataTypes.STRING,
    surat_permohonan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};