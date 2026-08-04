const ProjectSearch = ({
    search,
    setSearch
}) => {


    return (

        <input

            type="text"

            placeholder="Search projects..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            className="
            flex-1
            px-5
            py-3
            rounded-xl
            border
            border-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "

        />

    );

};


export default ProjectSearch;