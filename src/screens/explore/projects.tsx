import ProjectCard from '@/components/explore/project_card';
import Loader from '@/components/common/loader';
import { SERVER_ERROR } from '@/config/errors';
import { EXPLORE_URL } from '@/config/routes';
import getHandler from '@/handlers/get_handler';
import { Project } from '@/types';
import Toaster from '@/utils/toaster';
import React, { useState, useEffect } from 'react';
import ProjectView from '@/sections/explore/project_view';
import { useDispatch, useSelector } from 'react-redux';
import { navbarOpenSelector, setExploreTab } from '@/slices/feedSlice';
import NoSearch from '@/components/empty_fillers/search';
import InfiniteScroll from 'react-infinite-scroll-component';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [clickedOnProject, setClickedOnProject] = useState(false);
  const [clickedProjectIndex, setClickedProjectIndex] = useState(-1);

  const [fadeInProjectView, setFadeInProjectView] = useState(true);

  const navbarOpen = useSelector(navbarOpenSelector);

  const dispatch = useDispatch();

  const fetchProjects = async (search: string | null) => {
    const URL =
      search && search != ''
        ? `${EXPLORE_URL}/projects/trending?${'search=' + search}`
        : `${EXPLORE_URL}/projects/recommended?page=${page}&limit=${10}`;
    const res = await getHandler(URL);
    if (res.statusCode == 200) {
      if (search && search != '') {
        setProjects(res.data.projects || []);
        setHasMore(false);
      } else {
        const addedProjects = [...projects, ...(res.data.projects || [])];
        if (addedProjects.length === projects.length) setHasMore(false);
        setProjects(addedProjects);
        setPage(prev => prev + 1);
      }
      setLoading(false);
    } else {
      if (res.data.message) Toaster.error(res.data.message, 'error_toaster');
      else Toaster.error(SERVER_ERROR, 'error_toaster');
    }
  };

  const fetchProject = async (id: string | null) => {
    setLoading(true);
    const URL = `${EXPLORE_URL}/projects/${id}`;

    const res = await getHandler(URL);
    if (res.statusCode == 200) {
      setProjects([res.data.project] || []);

      if (res.data.project) {
        setClickedProjectIndex(0);
        setClickedOnProject(true);
      }

      setLoading(false);
    } else {
      if (res.data.message) Toaster.error(res.data.message, 'error_toaster');
      else Toaster.error(SERVER_ERROR, 'error_toaster');
    }
  };

  useEffect(() => {
    const pid = new URLSearchParams(window.location.search).get('pid');
    if (pid && pid != '') fetchProject(pid);
    else fetchProjects(new URLSearchParams(window.location.search).get('search'));
  }, [window.location.search]);

  useEffect(() => {
    const oid = new URLSearchParams(window.location.search).get('oid');
    const action = new URLSearchParams(window.location.search).get('action');
    if (oid && action == 'external') dispatch(setExploreTab(1)); //TODO add tab query to this url

    const tab = new URLSearchParams(window.location.search).get('tab');
    if (tab && tab == 'openings') dispatch(setExploreTab(1));
    if (tab && tab == 'users') dispatch(setExploreTab(2));
  }, []);

  const variants = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3'];

  return (
    <div className="w-full py-2">
      {loading ? (
        <Loader />
      ) : (
        <>
          {projects.length > 0 ? (
            <InfiniteScroll
              className={`w-full grid ${
                projects.length < 4
                  ? `grid-cols-${projects.length} px-12`
                  : navbarOpen
                  ? 'grid-cols-3 px-4 gap-12'
                  : 'grid-cols-4 px-12 gap-8'
              } max-md:grid-cols-1 max-md:gap-6 max-md:px-4 items-center justify-items-center transition-ease-out-500`}
              // className={`${
              //   navbarOpen ? 'w-[calc(100vw-380px)]' : 'w-[calc(100vw-180px)]'
              // } mx-auto flex justify-center gap-8 flex-wrap max-md:gap-6 max-md:px-4 max-md:justify-items-center transition-ease-out-500`}
              dataLength={projects.length}
              next={() => fetchProjects(new URLSearchParams(window.location.search).get('search'))}
              hasMore={hasMore}
              loader={<Loader />}
            >
              {clickedOnProject ? (
                <ProjectView
                  projectSlugs={projects.map(project => project.slug)}
                  clickedProjectIndex={clickedProjectIndex}
                  setClickedProjectIndex={setClickedProjectIndex}
                  setClickedOnProject={setClickedOnProject}
                  fadeIn={fadeInProjectView}
                  setFadeIn={setFadeInProjectView}
                />
              ) : (
                <></>
              )}
              {projects.map((project, index) => {
                return (
                  <ProjectCard
                    key={project.id}
                    index={index}
                    // size={navbarOpen || projects.length < 4 ? '[21vw]' : '80'}
                    size={navbarOpen || projects.length < 4 ? '[22vw]' : '72'}
                    project={project}
                    setClickedOnProject={setClickedOnProject}
                    setClickedProjectIndex={setClickedProjectIndex}
                  />
                );
              })}
            </InfiniteScroll>
          ) : (
            <NoSearch />
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
