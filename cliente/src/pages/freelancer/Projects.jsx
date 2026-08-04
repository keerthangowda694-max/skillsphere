import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProjectCard from "../../components/projects/ProjectCard";
import ProjectSearch from "../../components/projects/ProjectSearch";
import ProjectFilter from "../../components/projects/ProjectFilter";
import API from "../../services/api";


const Projects = () => {

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [sortBy, setSortBy] = useState("");



    useEffect(() => {

        fetchProjects();

    }, []);



    const fetchProjects = async () => {

        try {

            setLoading(true);

            const res = await API.get(
                "/projects/my-projects"
            );


            if (res.data.success) {


                const updated = res.data.projects.map(
                    (project) => ({

                        ...project,

                        progress:
                        project.status?.toLowerCase() === "completed"
                        ? 100
                        :
                        project.status?.toLowerCase() === "in progress"
                        ? 50
                        : 0

                    })
                );


                setProjects(updated);

            }


        }
        catch(err){

            console.log(err);

            setError(
                "Failed to load projects"
            );

        }
        finally{

            setLoading(false);

        }

    };






    const filteredProjects = useMemo(()=>{


        let result = [...projects];



        // SEARCH

        if(search.trim()){


            const keyword =
            search.toLowerCase();



            result = result.filter(project =>


                project.title
                ?.toLowerCase()
                .includes(keyword)


                ||

                project.description
                ?.toLowerCase()
                .includes(keyword)


                ||

                project.client?.fullName
                ?.toLowerCase()
                .includes(keyword)


            );


        }





        // STATUS FILTER

        if(status){


            result = result.filter(project =>

                project.status?.toLowerCase()
                ===
                status.toLowerCase()

            );


        }





        // SORT

        switch(sortBy){


            case "newest":

                result.sort(
                    (a,b)=>
                    new Date(b.createdAt)
                    -
                    new Date(a.createdAt)
                );

                break;



            case "oldest":

                result.sort(
                    (a,b)=>
                    new Date(a.createdAt)
                    -
                    new Date(b.createdAt)
                );

                break;



            case "budget-high":

                result.sort(
                    (a,b)=>
                    (b.budget?.max || 0)
                    -
                    (a.budget?.max || 0)
                );

                break;



            case "budget-low":

                result.sort(
                    (a,b)=>
                    (a.budget?.min || 0)
                    -
                    (b.budget?.min || 0)
                );

                break;



            case "budget-medium":

                result = result.filter(project => {


                    const max =
                    project.budget?.max || 0;


                    return max >= 10000 &&
                           max <= 50000;


                });


                break;



            default:
                break;


        }



        return result;


    },[
        projects,
        search,
        status,
        sortBy
    ]);







    if(loading){

        return(

            <DashboardLayout>

                <div className="flex justify-center items-center h-60">

                    <h2 className="text-xl font-semibold">
                        Loading Projects...
                    </h2>

                </div>

            </DashboardLayout>

        );

    }







    return(

        <DashboardLayout>


            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                    My Projects
                </h1>


                <p className="text-gray-500 mt-2">
                    View and manage all your assigned projects.
                </p>

            </div>





            <div className="flex flex-col md:flex-row gap-4 mb-8">


                <ProjectSearch

                    search={search}

                    setSearch={setSearch}

                />



                <ProjectFilter

                    status={status}

                    setStatus={setStatus}

                    sortBy={sortBy}

                    setSortBy={setSortBy}

                />


            </div>






            {
                error &&

                <div className="bg-red-100 text-red-700 p-4 rounded-xl">

                    {error}

                </div>

            }






            {
                filteredProjects.length === 0 ?


                <div className="bg-white rounded-xl shadow p-8 text-center">

                    <h2 className="text-xl font-semibold">
                        No Projects Found
                    </h2>


                    <p className="text-gray-500 mt-2">
                        Try changing your search or filters.
                    </p>

                </div>



                :


                <div className="grid lg:grid-cols-2 gap-6">

                    {
                       
                        filteredProjects.map(project=>(

                            <ProjectCard

                                key={project._id}

                                project={project}

                            />
                           

                        ))
                    }
                    </div>

              
              

            }



        </DashboardLayout>

    );

};


export default Projects;