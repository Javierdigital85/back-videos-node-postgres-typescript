import { RequestHandler } from "express";
import Fav from "../models/Favs";
import { Video } from "../models";
//import { User } from "../models";

export const createFav: RequestHandler = async (req, res) => {
  try {
    console.log("llega??");
    const { userId, videoId } = req.body;
    const newFav = await Fav.findOrCreate({
      where: { userId, videoId },
      defaults: { userId },
    });
    return res.status(201).send(newFav);
  } catch (error) {
    console.log(error);
  }
};

export const getFavs: RequestHandler = async (req, res) => {
  let fav;
  try {
    const { userId } = req.query;
    const userIdNumber = userId ? parseInt(userId as string, 10) : undefined;
    if (userIdNumber) {
      fav = await Fav.findAll({
        where: { userId: userIdNumber },
        include: [{ model: Video, as: "video" }],
      });
    }
    return res.status(200).send(fav);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const deleteFavs: RequestHandler= async(req,res)=> {
  const {id} = req.params
  try {
    const deleteFavVideo = await Fav.destroy({where:{id}})
    if(!deleteFavVideo){
      return res.status(404).send("Video does not exist to delete!")
    }
    return res.status(204).send()
  } catch (error) {
    return res.status(500).send(error)
  }
}
