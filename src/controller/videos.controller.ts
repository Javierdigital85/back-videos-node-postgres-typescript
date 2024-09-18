import { RequestHandler } from "express";
import * as videoService from "../service/video.service";
import { UniqueConstraintError } from "sequelize";
import { Video } from "../models";

export const createVideo: RequestHandler = async (req, res) => {
  try {
    const { url, description, title, userId } = req.body;
    const foundVideo = await videoService.findVideo(url);
    if (foundVideo) {
      return res.status(400).send("This video Already exists!");
    }

    const newVideo = await videoService.createVideo(
      title,
      description,
      url,
      userId
    );
    return res.status(201).send(newVideo);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).send("This video already exists!");
    }
    return res.status(500).send(error);
  }
};

export const getVideos: RequestHandler = async (req, res) => {
  let video;
  try {
    //Puedes usar req.query para recibir filtros de búsqueda
    const { userId } = req.query; //obtengo por clave y valor lo que envia el front por parametro.
    const userIdNumber = userId ? parseInt(userId as string, 10) : undefined;
    if (userIdNumber) {
      video = await Video.findAll({ where: { userId: userId } });
    } else {
      video = await videoService.allVideos();
    }
    return res.status(200).send(video);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateVideo: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const updatedVideo = await videoService.updateVideo(Number(id), {
      title,
      description,
      url,
    });
    if (!updatedVideo) {
      return res.status(404).send("Task does not exist,nothing to update!");
    }
    return res.status(200).send(updatedVideo);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getAVideo: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const getVideo = await videoService.getAVideo(Number(id));
    if (!getVideo) {
      return res.status(404).send("The video does not exist!");
    }
    return res.status(200).send(getVideo);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteVideo: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAvideo = await videoService.deleteVideo(Number(id));
    if (!deleteAvideo) {
      return res.status(404).send("This video does not exist");
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send(error);
  }
};
