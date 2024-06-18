import React from "react";
import { Banner, HomeCourses, HowMyPageWorks, Reviews } from "../../../components/Web";

export function Home() {
    return (
        <div>
            <Banner />
            <HomeCourses />
            <HowMyPageWorks />
            <Reviews />
        </div>
    );
}