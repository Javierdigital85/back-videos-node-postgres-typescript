import Video from "../models/Video";
interface VideoI {
  title: string;
  description: string;
  url: string;
}

export const findVideo = async (url: string): Promise<Video | null> => {
  return await Video.findOne({ where: { url: url } });
};

export const createVideo = async (
  title: string,
  description: string,
  url: string
): Promise<Video> => {
  return await Video.create({ title, description, url });
};

export const allVideos = async (): Promise<Video[]> => {
  return await Video.findAll();
};

export const update = async (
  id: number,
  updateData: VideoI
): Promise<Video | null> => {
  const [rows, updateVideo] = await Video.update(updateData, {
    where: { id: id },
    returning: true,
  });
  if (rows === 0) {
    return null;
  }
  return updateVideo[0];
};

export const getAVideo = async (id: number): Promise<Video | null> => {
  return await Video.findByPk(id);
};

export const deleteVideo = async (id: number): Promise<Video | null> => {
  const video = await Video.findByPk(id);
  if (!video) {
    return null;
  }
  await Video.destroy({ where: { id } });
  return video;
};
