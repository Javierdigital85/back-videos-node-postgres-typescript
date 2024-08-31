import { RequestHandler } from "express";
import * as videoService from "../service/video.service";
import { UniqueConstraintError } from "sequelize";

export const createVideo: RequestHandler = async (req, res) => {
  try {
    const { url, description, title } = req.body;
    const foundVideo = await videoService.findVideo(url);
    if (foundVideo) {
      return res.status(400).send("This video Already exists!");
    }

    const newVideo = await videoService.createVideo(title, description, url);
    return res.status(201).send(newVideo);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(400).send("This video already exists!");
    }
    return res.status(500).send(error);
  }
};

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const allVideos = await videoService.allVideos();
    return res.status(200).send(allVideos);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateVideo: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const updatedVideo = await videoService.update(Number(id), {
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
