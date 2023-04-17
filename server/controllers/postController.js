const md5 = require("md5");
const postModel = require("../models/postModel");
const moment = require('moment/moment');
const fs = require('fs')
module.exports = {
    post: async (req, res) => {
        const { title, about, video } = req?.body;
        const images = req?.files?.images;
        if (!title || !about) {
            res.send({
                success: false,
                message: "Qatorlarni to'ldiring!"
            });
        } else if (images?.length < 1) {
            res.send({
                success: false,
                message: "Rasm tanlang!"
            });
        } else if (images.length > 5) {
            res.send({
                success: false,
                message: "Rasmlar 5 tadan ko'p bo'lmasligi kerak!"
            });
        } else {
            function checkImages() {
                if (!images.length) {
                    try {
                        const filePath = `/public/images/${md5(new Date() + title + images.name)}.png`;
                        images.mv(`.${filePath}`);
                        return [filePath]
                    } catch (err) {
                        console.log(err);
                        res.send({
                            success: false,
                            message: "Xatolik!"
                        })
                    }
                } else {
                    try {
                        const imageList = [];
                        images.forEach(image => {
                            const filePath = `/public/images/${md5(new Date() + title + image.name)}.png`;
                            image.mv(`.${filePath}`);
                            imageList.push(filePath);
                        });
                        return imageList
                    } catch (err) {
                        console.log(err);
                        res.send({
                            success: false,
                            message: "Xatolik!"
                        })
                    }
                }
            }
            new postModel({
                title, about, images: checkImages(), video
            }).save().then(() => {
                res.send({
                    success: true,
                    message: 'Post joylandi!'
                });
            }).catch(err => {
                console.log(err);
                res.send({
                    success: false,
                    message: 'Xatolik!'
                })
            })
        }
    },
    getAll: async (req, res) => {
        const $posts = await postModel.find();
        if ($posts.length < 1) {
            res.send({
                success: false,
                message: "Postlar mavjud emas!"
            })
        } else {
            try {
                const $list = [];
                $posts.forEach((post => {
                    const { title, about, images, video, date } = post;
                    function imgs() {
                        let imglist = [];
                        images.forEach(img => {
                            imglist.push(process.env.SITE_LINK + img)
                        });
                        return imglist
                    }
                    const moddedPost = {
                        postId: post._id,
                        title,
                        about,
                        images: imgs(),
                        video: video === 'undefined' ? null : video,
                        date: moment.unix(date).format('DD.MM.yyyy')
                    };
                    $list.unshift(moddedPost);
                }));
                res.send({
                    success: true,
                    message: 'Barcha postlar',
                    data: $list
                });
            } catch (err) {
                console.log(err);
                res.send({
                    success: false,
                    message: 'Postlarni olishda xatolik!!'
                });
            }
        }
    },
    delete: async (req, res) => {
        try {
            const { postid } = req.params;
            const $post = await postModel.findOne({ _id: postid });
            if (!$post) {
                res.send({
                    success: false,
                    message: "Post topilmadi!"
                });
            } else {
                $post.images.forEach((img) => {
                    fs.unlink(`.${img}`, () => { })
                });
                $post.deleteOne();
                res.send({
                    success: true,
                    message: "Post o'chirildi!"
                })
            }
        } catch (error) {
            console.log(error);
            res.send({
                success: false,
                message: "Xatolik!"
            });
        }
    },
    edit: async (req, res) => {
        const { postid } = req.params;
        const images = req?.files?.images;
        if (postid.length !== 24) {
            res.send({
                success: false,
                message: "Xatolik! Qayta urunib ko'ring: SERVER"
            });
        } else {
            try {
                const $post = await postModel.findById(postid);
                if (!$post) {
                    res.send({
                        success: false,
                        message: "Post topilmadi!"
                    });
                } else {
                    if (!images) {
                        $post.set(req.body).save().then(() => {
                            res.send({
                                success: true,
                                message: "O'zgartirildi!"
                            });
                        }).catch(err => {
                            console.log(err);
                            res.send({
                                success: false,
                                message: "Xatolik! Qayta urunib ko'ring: SET CATCH"
                            });
                        })
                    } else {
                        const {title, about, video} = req.body;
                        $post.images.forEach(img => {
                            fs.unlink(`.${img}`,()=>{});
                        });
                        function checkImages() {
                            if (!images.length) {
                                try {
                                    const filePath = `/public/images/${md5(new Date() + title + images.name)}.png`;
                                    images.mv(`.${filePath}`);
                                    return [filePath]
                                } catch (err) {
                                    console.log(err);
                                    res.send({
                                        success: false,
                                        message: "Xatolik!"
                                    })
                                }
                            } else {
                                try {
                                    const imageList = [];
                                    images.forEach(image => {
                                        const filePath = `/public/images/${md5(new Date() + title + image.name)}.png`;
                                        image.mv(`.${filePath}`);
                                        imageList.push(filePath);
                                    });
                                    return imageList
                                } catch (err) {
                                    console.log(err);
                                    res.send({
                                        success: false,
                                        message: "Xatolik!"
                                    })
                                }
                            }
                        }
                        $post.set({ title, about, video, images: checkImages() }).save().then(() => {
                            res.send({
                                success: true,
                                message: "O'zgartirildi!"
                            });
                        }).catch(err => {
                            console.log(err);
                            res.send({
                                success: false,
                                message: "Xatolik! Qayta urunib ko'ring: SET CATCH"
                            });
                        });
                    }
                }
            } catch (error) {
                console.log(error);
                res.send({
                    success: false,
                    message: "Xatolik! Qayta urunib ko'ring: CATCH"
                });
            }
        }
    }
}