var express = require('express')
var router = express.Router()

//tambahkan baris kode ini untuk import models
const models = require('../models/index');

/**
 * INDEX POSTS
 */

// router.get('/', function (req, res, next) {
//     //query
//     connection.query('SELECT * FROM posts ORDER BY id desc', function (error, rows) {
//         if (error) {
//             req.flash('error', error)
//             res.render('posts/index', {
//                 title: 'Posts',
//                 data: ''
//             })
//         } else {
//             //render view with data
//             res.render('posts/index', {
//                 title: 'Posts',
//                 data: rows
//             })
//         }
//     })
// })
/**
 * Route untuk mengambil semua data artikel
 */
router.get('/', async function(req, res, next) {
    try {
      //mengambil semua data
      const posts = await models.posts.findAll({});
      
      if (posts.length !== 0) {
        res.json({
          'status': 'OK',
          'messages': '',
          'data': posts
        });
      } else {
        res.json({
          'status': 'EMPTY',
          'messages': 'Data is empty',
          'data': {} 
        });
      }
    } catch (err) {
      res.status(500).json({
        'status': 'ERROR',
        'messages': 'Internal Server Error'
      })
    }
  });

  /**
 * Route untuk mengambil artikel berdasarkan ID
 */
router.get('/:id', async function(req, res, next) {
    try {			
      //mengangkap param ID
      const id = req.params.id;
      const post = await models.posts.findByPk(id);		
          
      if (post) {
        res.json({
          'status': 'OK',
          'messages': '',
          'data': post
        });
      } else {
        res.status(404).json({
          'status': 'NOT_FOUND',
          'messages': 'Data not found',
          'data': null 
        });
      }
    } catch (err) {		
      res.status(500).json({
        'status': 'ERROR',
        'messages': 'Internal Server Error'
      })
    }
  });

/**
 * CREATE POST
 */
// router.get('/create', function (req, res, next) {
//     res.render('posts/create', {
//         title: '',
//         content: ''
//     })
// })

/**
* Route untuk membuat artikel baru
*/
router.post('/', async function(req, res, next) {
    try {
      //menangkap form data yang dikirim melalu request body
      const {
        title,
        content,
        tags,
        published
      } = req.body;
      //membuat data baru di db menggunakan method create
      const post = await models.posts.create({
        title,
        content,
        tags,
        published
      });
      //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
      if (post) {
        res.status(201).json({
          'status': 'OK',
          'messages': 'Post berhasil ditambahkan',
          'data': post
        });
      }
    } catch(err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message
      });
    }
  });

/**
 * STORE POST
 */
// router.post('/store', function (req, res, next) {
    
//     let title   = req.body.title;
//     let content = req.body.content;
//     let errors  = false;

//     if(title.length === 0) {
//         errors = true;

//         // set flash message
//         req.flash('error', "Silahkan Masukkan Title");
//         // render to add.ejs with flash message
//         res.render('posts/create', {
//             title: title,
//             content: content
//         })
//     }

//     if(content.length === 0) {
//         errors = true;

//         // set flash message
//         req.flash('error', "Silahkan Masukkan Konten");
//         // render to add.ejs with flash message
//         res.render('posts/create', {
//             title: title,
//             content: content
//         })
//     }

//     // if no error
//     if(!errors) {

//         let formData = {
//             title: title,
//             content: content
//         }
        
//         // insert query
//         connection.query('INSERT INTO posts SET ?', formData, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 req.flash('error', err)
                 
//                 // render to add.ejs
//                 res.render('posts/create', {
//                     title: formData.title,
//                     content: formData.content                    
//                 })
//             } else {                
//                 req.flash('success', 'Data Berhasil Disimpan!');
//                 res.redirect('/posts');
//             }
//         })
//     }

// })


/**
 * EDIT POST
 */
// router.get('/edit/(:id)', function(req, res, next) {

//     let id = req.params.id;
   
//     connection.query('SELECT * FROM posts WHERE id = ' + id, function(err, rows, fields) {
//         if(err) throw err
         
//         // if user not found
//         if (rows.length <= 0) {
//             req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
//             res.redirect('/posts')
//         }
//         // if book found
//         else {
//             // render to edit.ejs
//             res.render('posts/edit', {
//                 id:      rows[0].id,
//                 title:   rows[0].title,
//                 content: rows[0].content
//             })
//         }
//     })
// })

/**
 * UPDATE POST
 */
// router.post('/update/:id', function(req, res, next) {

//     let id      = req.params.id;
//     let title   = req.body.title;
//     let content = req.body.content;
//     let errors  = false;

//     if(title.length === 0) {
//         errors = true;

//         // set flash message
//         req.flash('error', "Silahkan Masukkan Title");
//         // render to edit.ejs with flash message
//         res.render('posts/edit', {
//             id:         req.params.id,
//             title:      title,
//             content:    content
//         })
//     }

//     if(content.length === 0) {
//         errors = true;

//         // set flash message
//         req.flash('error', "Silahkan Masukkan Konten");
//         // render to edit.ejs with flash message
//         res.render('posts/edit', {
//             id:         req.params.id,
//             title:      title,
//             content:    content
//         })
//     }

//     // if no error
//     if( !errors ) {
 
//         let formData = {
//             title: title,
//             content: content
//         }

//         // update query
//         connection.query('UPDATE posts SET ? WHERE id = ' + id, formData, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 // set flash message
//                 req.flash('error', err)
//                 // render to edit.ejs
//                 res.render('posts/edit', {
//                     id:     req.params.id,
//                     name:   formData.name,
//                     author: formData.author
//                 })
//             } else {
//                 req.flash('success', 'Data Berhasil Diupdate!');
//                 res.redirect('/posts');
//             }
//         })
//     }
// })

router.put('/:id', async function(req, res, next){
    try {
      const id = req.params.id
      const {
        title,
        content,
        tags,
        published
      } = req.body
      
      const post = models.posts.update({
        title,
        content,
        tags,
        published
      }, {
        where: {
          id: id
        }
      })
  
      if (post) {
        res.json({
          'status': 'OK',
          'messages': 'Post berhasil diubah'
        })
      }
    } catch(err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message
      })
    }
  });

/**
 * DELETE POST
 */
// router.get('/delete/(:id)', function(req, res, next) {

//     let id = req.params.id;
     
//     connection.query('DELETE FROM posts WHERE id = ' + id, function(err, result) {
//         //if(err) throw err
//         if (err) {
//             // set flash message
//             req.flash('error', err)
//             // redirect to posts page
//             res.redirect('/posts')
//         } else {
//             // set flash message
//             req.flash('success', 'Data Berhasil Dihapus!')
//             // redirect to posts page
//             res.redirect('/posts')
//         }
//     })
// })

/**
 * Route untuk menghapus artikel berdasarkan ID
 */
router.delete('/:id', async function(req, res, next){
    try {
      const id = req.params.id
      const post = models.posts.destroy({
        where: {
          id: id
        }
      })
  
      if (post) {
        res.json({
          'status': 'OK',
          'messages': 'Post berhasil dihapus'
        })
      }
    } catch(err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message
      })
    }
  });

module.exports = router