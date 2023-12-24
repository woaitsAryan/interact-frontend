import React, { useState } from 'react';
import { Project } from '@/types';
import Image from 'next/image';
import { PROJECT_PIC_URL, PROJECT_URL } from '@/config/routes';
import { CircleDashed, Eye, EyeSlash, HeartStraight } from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux';
import { setManagerProjects, setOwnerProjects, userSelector } from '@/slices/userSlice';
import EditProject from '@/sections/workspace/edit_project';
import Link from 'next/link';
import patchHandler from '@/handlers/patch_handler';
import Toaster from '@/utils/toaster';
import deleteHandler from '@/handlers/delete_handler';
import ConfirmDelete from '../common/confirm_delete';
import { SERVER_ERROR } from '@/config/errors';

interface Props {
  index: number;
  project: Project;
  size?: number;
  setProjects?: React.Dispatch<React.SetStateAction<Project[]>>;
  setClickedOnProject: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ProjectCard = ({
  index,
  project,
  size = 72,
  setProjects,
  setClickedOnProject,
  setClickedProjectIndex,
}: Props) => {
  const [clickedOnSettings, setClickedOnSettings] = useState(false);
  const [clickedOnEdit, setClickedOnEdit] = useState(false);
  const [clickedOnDelete, setClickedOnDelete] = useState(false);

  const user = useSelector(userSelector);

  const dispatch = useDispatch();

  const handleUnPublish = async () => {
    const toaster = Toaster.startLoad('Editing your project...');

    const formData = {
      isPrivate: !project.isPrivate,
    };

    const URL = `${PROJECT_URL}/${project.slug}`;

    const res = await patchHandler(URL, formData, 'multipart/form-data');

    if (res.statusCode === 200) {
      if (setProjects)
        setProjects(prev =>
          prev.map(p => {
            if (p.id == project.id) {
              return { ...p, isPrivate: !p.isPrivate };
            } else return p;
          })
        );
      Toaster.stopLoad(toaster, 'Project Added', 1);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else Toaster.stopLoad(toaster, SERVER_ERROR, 0);
    }
  };

  const handleDelete = async () => {
    const toaster = Toaster.startLoad('Deleting your project...');

    const URL = `${PROJECT_URL}/${project.id}`;

    const res = await deleteHandler(URL);

    if (res.statusCode === 204) {
      if (setProjects) setProjects(prev => prev.filter(p => p.id != project.id));
      dispatch(setOwnerProjects(user.ownerProjects.filter(projectID => projectID != project.id)));
      setClickedOnDelete(false);
      Toaster.stopLoad(toaster, 'Project Deleted', 1);
    } else {
      if (res.data.message) Toaster.stopLoad(toaster, res.data.message, 0);
      else Toaster.stopLoad(toaster, SERVER_ERROR, 0);
    }
  };

  const variants = ['w-80', 'w-72', 'w-64', 'w-56', 'h-80', 'h-72', 'h-64', 'h-56'];
  return (
    <>
      {clickedOnEdit ? (
        <EditProject projectToEdit={project} setShow={setClickedOnEdit} setProjects={setProjects} />
      ) : (
        <></>
      )}
      {clickedOnDelete ? <ConfirmDelete setShow={setClickedOnDelete} handleDelete={handleDelete} /> : <></>}

      <div
        onClick={() => {
          setClickedOnProject(true);
          setClickedProjectIndex(index);
        }}
        onMouseLeave={() => setClickedOnSettings(false)}
        className={`w-${size} h-${size} max-lg:w-56 max-lg:h-56 max-md:w-72 max-md:h-72 rounded-lg relative group cursor-pointer transition-ease-out-500`}
      >
        <div className="w-full h-full absolute top-0 hidden group-hover:flex justify-between gap-4 text-white animate-fade_third z-[6] rounded-lg p-2">
          {project.userID == user.id || user.editorProjects.includes(project.id) ? (
            <div
              onClick={el => {
                el.stopPropagation();
                setClickedOnSettings(prev => !prev);
              }}
              className="h-8 w-8 flex-center glassMorphism rounded-full p-1"
            >
              •••
            </div>
          ) : (
            <></>
          )}

          {clickedOnSettings ? (
            <div
              onClick={el => el.stopPropagation()}
              className="w-1/2 h-fit flex flex-col absolute top-2 left-12 rounded-2xl glassMorphism p-2"
            >
              {project.userID == user.id || user.editorProjects.includes(project.id) ? (
                <div
                  onClick={() => setClickedOnEdit(true)}
                  className="w-full px-4 py-3 hover:bg-[#ffffff78] dark:hover:bg-[#ffffff19] transition-ease-100 rounded-lg"
                >
                  Edit
                </div>
              ) : (
                <></>
              )}
              {project.userID == user.id || user.managerProjects.includes(project.id) ? (
                <Link
                  href={`/workspace/manage/${project.slug}`}
                  target="_blank"
                  className="w-full px-4 py-3 hover:bg-[#ffffff78] dark:hover:bg-[#ffffff19] transition-ease-100 rounded-lg"
                >
                  Manage
                </Link>
              ) : (
                <></>
              )}
              {project.userID == user.id ? (
                <div
                  onClick={() => setClickedOnDelete(true)}
                  className="w-full px-4 py-3 hover:bg-[#ffffff78] dark:hover:bg-[#ffffff19] hover:text-primary_danger transition-ease-100 rounded-lg"
                >
                  Delete
                </div>
              ) : (
                <></>
              )}
              {project.userID == user.id || user.editorProjects.includes(project.id) ? (
                <div
                  onClick={handleUnPublish}
                  className="w-full px-4 py-3 hover:bg-[#ffffff78] dark:hover:bg-[#ffffff19] transition-ease-100 rounded-lg"
                >
                  {project.isPrivate ? 'Publish' : 'UnPublish'}
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          {project.isPrivate ? <EyeSlash size={24} /> : <></>}
        </div>
        <div className="w-full h-full rounded-lg absolute top-0 left-0 bg-gradient-to-b from-[#00000084] z-[5] to-transparent opacity-0 group-hover:opacity-100 transition-ease-300"></div>
        <Image
          crossOrigin="anonymous"
          className="w-full h-full rounded-lg object-cover absolute top-0 left-0 "
          src={`${PROJECT_PIC_URL}/${project.coverPic}`}
          alt="Project Cover"
          width={200}
          height={200}
        />
        <div className="w-full glassMorphism text-white rounded-b-lg font-primary absolute bottom-0 right-0 flex flex-col px-4 py-2">
          <div className="text-xl max-lg:text-base max-md:text-xl">{project.title}</div>
          <div className="w-full flex items-center justify-between">
            {project.userID != user.id ? (
              <div className="text-sm max-lg:text-xs max-md:text-sm">{project.user.name}</div>
            ) : (
              <div className="text-sm line-clamp-1 max-lg:hidden max-md:flex">{project.tagline}</div>
            )}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs">
                <HeartStraight size={16} />
                <div>{project.noLikes}</div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <CircleDashed size={16} />
                <div>{project.totalNoViews}</div>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
