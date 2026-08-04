const ProjectFilter = ({
    status,
    setStatus,
    sortBy,
    setSortBy
}) => {


    return (

        <div className="flex gap-4">


            <select

                value={status}

                onChange={(e)=>setStatus(e.target.value)}

                className="
                px-4
                py-3
                rounded-xl
                border
                "

            >

                <option value="">
                    All Status
                </option>


                <option value="Pending">
                    Pending
                </option>


                <option value="In Progress">
                    In Progress
                </option>


                <option value="Completed">
                    Completed
                </option>


                <option value="Cancelled">
                    Cancelled
                </option>


            </select>






            <select

                value={sortBy}

                onChange={(e)=>setSortBy(e.target.value)}

                className="
                px-4
                py-3
                rounded-xl
                border
                "

            >

                <option value="">
                    Sort By
                </option>


                <option value="newest">
                    Newest
                </option>


                <option value="oldest">
                    Oldest
                </option>


                <option value="budget-high">
                    Budget High
                </option>


                <option value="budget-low">
                    Budget Low
                </option>


                <option value="budget-medium">
                    Budget Medium
                </option>


            </select>



        </div>

    );

};


export default ProjectFilter;