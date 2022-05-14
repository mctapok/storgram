import {useEffect} from "react";
import Timeline from "../components/Timeline";
import Header from "../components/Header";
import Index from "../components/Sidebar/Index";

export default function Dashboard(){
    useEffect(() => {
       document.title = '100gram'
    }, []);

    return (
        <div>
            <Header/>
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline/>
                <Index/>
            </div>
        </div>
    );
}