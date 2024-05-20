export interface IStoryProps {
  data: IStory;
  setEditData: (data: IStory) => void;
  handleDelete: (data: IStory) => void;
}

export interface IStory {
  _id: string;
  description: string;
  guest: {
    first_name: string;
    last_name: string;
    email: string;
  };
  title: string;
}
