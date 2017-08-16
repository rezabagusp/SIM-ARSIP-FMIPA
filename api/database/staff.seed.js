var express = require('express'),
    sequelize = require('../connection');

var Staff = sequelize.import(__dirname + '/../models/staff.model');

Staff
    .bulkCreate([
        {
            nama_staff: "Prof. Dr. Muhammad Aslam Abdurrohim, M.Si, S.Komp",
            email_staff: "m.aslam.abdurrohim@gmail.com",
            jabatan_id: 1
        }, {
            nama_staff: "Dr. Ir. Sri Nurdiati M.Sc",
            email_staff: "m.aslam.abdurrohim@gmail.com",
            jabatan_id: 2
        }, {
            nama_staff: "Dr. Ir. Kgs. Dahlan",
            email_staff: "m.aslam.abdurrohim@gmail.com",
            jabatan_id: 3
        }, {
            nama_staff: "Dr. Ir. Hamim, M.Si",
            email_staff: "m.aslam.abdurrohim@gmail.com",
            jabatan_id: 4
        }, {
            nama_staff: "Ir. Meuthia Rachmaniah, M.Sc.",
            email_staff: "m.aslam.abdurrohim@gmail.com",
            jabatan_id: 5
        }
    ])
    
    