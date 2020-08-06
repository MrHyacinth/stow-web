import React from "react";
import SimpleTable from "./SimpleTable";
import PaginationTable from "./PaginationTable";
import { Breadcrumb, SimpleCard } from "matx";

const AppTable = () => {
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Material", path: "/material" },
            { name: "Table" }
          ]}
        />
      </div>
     
      <div className="py-12" />
      <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard>
    </div>
  );
};

export default AppTable;
