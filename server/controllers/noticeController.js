const Notice = require("../models/noticeModel");
const User = require("../models/userModel");


/* ADD NOTICE */
const addNotice = async (req, res) => {
  try {
    const { title, description , author } = req.body;

    const titleExists = await Notice.findOne({ title });

    if (titleExists) {
      return res.status(409).json({ message: "Notice already exists" });
    }

    const noticeDoc = await Notice.create({
      title,
      description,
      author,
    });
    return res.status(200).json(noticeDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* EDIT NOTICE */
const editNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description ,author,editor_id} = req.body;

    const noticeDoc = await Notice.findById(id);

    if (!noticeDoc) {
      return res.status(404).json({ message: "Notice does not exists" });
    }

    const editorDoc = await User.findById(editor_id)
    
    //editorDoc -> user who want to edit
    //author -> who create notice

    if(author.role != editorDoc.role){
      return res.status(401).json("Authorization failed")
    }

    noticeDoc.set({
      title,
      description,
    });
    await noticeDoc.save();
    res.status(200).json(noticeDoc);
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* GET ALL NOTICES */
const getAllNotices = async (req, res) => {
  try {
    const allNotices = await Notice.find({}).populate("author");
    if (allNotices) {
      return res.status(200).json(allNotices);
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* DELETE NOTICE */
const deleteNotice = async (req, res) => {
  try {
    const {id} = req.params;
    const {editor_id} = req.body
    
    const noticeDoc = await Notice.findById(id);

    if(!noticeDoc){
        return res.status(404).json({message:"Notice dose not exists"})
    }
    const author_id = noticeDoc.author;
    const author = await User.findById(author_id)
    const editorDoc = await User.findById(editor_id)
     //editorDoc -> user who want to delete
    //author -> who create notice

   
    if(author.role != editorDoc.role){
      return res.status(401).json("Authorization failed")
    }

    await Notice.deleteOne({_id:id})
    return res.status(200).json({message:"Notice deleted"})

  } catch (error) {
    console.log(error);
    return res.json({ message: `Error occured ${error}` });
  }
};

/* GET A NOTICE */
const getNotice = async (req,res)=>{
    try {
        const {id} = req.params;
        const noticeDoc = await Notice.findById(id)
        if(!noticeDoc){
            return res.status(404).json({message:"Notice dose not exists"})
        }
        
        return res.status(200).json(noticeDoc)
    } catch (error) {
        console.log(error);
        return res.json({ message: `Error occured ${error}` });
    
    }
}

module.exports = {
  addNotice,
  editNotice,
  getAllNotices,
  deleteNotice,
  getNotice,
};
