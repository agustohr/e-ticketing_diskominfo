const { User } = require('../../../models');
const { Notification } = require('../../../models');
// var XLSX = require("xlsx");
const excelToJson = require("convert-excel-to-json")
const fs = require("fs-extra")

module.exports = {
  getAll: (req, res) => {
    User.findAll()
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  },

  add: (req, res) => {
    User.addUser(req.body)
      .then((users) =>
        res.json(users))
      .catch((err) => res.json(err));
  },

  delete: (req, res) => {
    User.deleteUser(req.params.id)
      .then(() => res.json({ msg: `User berhasil dihapus` }))
      .catch((err) => res.json(err));
  },

  update: (req, res) => {
    User.updateUser(req.body, req.params.id)
      .then(() => res.json({ msg: "Update data User berhasil" }))
      .catch((err) => res.json(err));
  },

  editProfile: (req, res) => {
    User.updateProfile(req.body, req.params.id)
      .then(() => res.json({ msg: "Update data User berhasil" }))
      .catch((err) => res.json(err));
  },

  getById: (req, res) => {
    User.getUsersById(req.params.id)
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  },

  akunPegawaiList: async (req, res) => {
    const akunPegawai = await User.findAll();
    const notif = await Notification.findAll();
    res.render('pages/admin/akun_pegawai', {page_name: "Akun Pegawai", users: req.user, akunPegawai: akunPegawai, notif: notif});
  },

  akunDinasList: async (req, res) => {
    const akunDinas = await User.findAll();
    const notif = await Notification.findAll();
    res.render('pages/admin/akun_dinas', {page_name: "Akun Dinas", users: req.user, akunDinas: akunDinas, notif: notif});
  },

  akunAdminList: async (req, res) => {
    const akunAdmin = await User.findAll();
    const notif = await Notification.findAll();
    res.render('pages/admin/akun_admin', {page_name: "Akun Admin", users: req.user, akunAdmin: akunAdmin, notif: notif});
  },

  // approveAkunDinasList: async (req, res) => {
  //   const akunDinas = await User.findAll();
  //   const notif = await Notification.findAll();
  //   res.render('pages/admin/approve_akun_dinas', {users: req.user, akunDinas: akunDinas, notif: notif});
  // },

  showMyProfile: async (req, res) => {
    // const akunPegawai = await User.findAll();
    const notif = await Notification.findAll();
    res.render('pages/pegawai/profile', {page_name: "Profile", users: req.user, notif: notif});
  },

  showRegAkunDinas: async (req, res) => {
    // const akunPegawai = await User.findAll();
    const notif = await Notification.findAll();
    res.render('pages/pegawai/reg_akun_dinas', {page_name: "RegAkunDinas", users: req.user, notif: notif});
  },

  showMyProfileAdmin: async (req, res) => {
    // const akunPegawai = await User.findAll();
    const notif = await Notification.findAll();
    res.render('pages/admin/profile', {page_name: "Profile", users: req.user, notif: notif});
  },

  addPegawai: (req, res) => {
    User.addUser(req.body)
      .then((users) =>{
        res.json(users).status(200)
      })
      .catch((err) => res.json(err));
    
  },

  addPegawaiExcel: (req, res) => {
      if (req.file?.filename == null || req.file?.filename == undefined) {
        res.status(400).json("No File");
      } else {
        var filePath = "public/dataPegawaiExcel/" + req.file.filename;
        console.log(filePath)

        const excelData = excelToJson({
          sourceFile : filePath,
          header : {
            rows : 1,
          },
          columnToKey : {
            "*" : "{{columnHeader}}",
          },
        });
        fs.remove(filePath)
        const data = Object.values(excelData)[0];

        // console.log(data)

        // console.log(data.length)
        const nip = [];
        const input = [];
        let checkNIP = false;
        var duplicateElements;

        data.forEach(async (i, index) => {
          nip[index] = i.nip;
          console.log(nip)
          var toFindDuplicates = nip => nip.filter((item, index) => nip.indexOf(item) !== index)
          duplicateElements = toFindDuplicates(nip);
          console.log(duplicateElements)
        })

        data.forEach(async (i, index) => {
          const pegawai = await User.findOne({ where: { nip: i.nip } });
          if (pegawai === null) {
            for (let j = 0; j < duplicateElements.length; j++) {
              if (i.nip == duplicateElements[j]) {
                if (input[j] == "done") {
                  checkNIP = true;
                  break;
                }else{
                  checkNIP = false;
                  input[j] = "done"
                  break;
                }
              }
            }

            if(checkNIP == false){
              User.addUser({
                nip: i.nip,
                name: i.name,
                email: i.email,
                dinas: i.dinas,
                password: i.password,
                role: "pegawai"
              })
            }
            checkNIP = false;
          }
        });
        res.status(200).json({ msg: `Berhasil tambah pegawai` })
      }
  },

  resetPasswordPegawai: (req, res) => {
    User.resetPassword(req.body, req.params.id)
      .then(() => res.json({ msg: "Reset password pegawai berhasil" }))
      .catch((err) => res.json(err));
  },

  //upload surat pemrohonan
  regAkunDinas : (req, res, next) => {
    User.registerAkunDinas({ status_akun_dinas: req.body.status_akun_dinas, surat_permohonan: req.file.path}, req.params.id)
    .then(() => res.json({ msg: "Register Akun Dinas Berhasil" }))
    .catch((err) => res.json(err));
  },

  approvedAkunDinas: (req, res) => {
    User.approvedAkunDinas(req.body, req.params.id)
      .then(() => res.json({ msg: "Update data User berhasil" }))
      .catch((err) => res.json(err));
  },


};