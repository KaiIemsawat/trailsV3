import { Link, useParams } from "react-router-dom";
import { BiLocationPlus, BiImageAdd } from "react-icons/bi";
import { PiDogBold, PiTicketBold } from "react-icons/pi";
import { GiForestCamp } from "react-icons/gi";
import { GrWheelchair } from "react-icons/gr";
import { TbParking, TbTent } from "react-icons/tb";
import { useState } from "react";
import Amenities from "../Amenities";
import axios from "axios";

export default function MyTrails() {
    const { action } = useParams();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [addedPhoto, setAddedPhoto] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [description, setDescription] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [distance, setDistance] = useState(1);
    const [difficulty, setDifficulty] = useState(1);
    const [duration, setDuration] = useState(1);

    function inputHeader(text) {
        return <h2 className="text-xl  mt-4">{text}</h2>;
    }

    function inputDescription(text) {
        return <p className="text-xs text-slate-400">{text}</p>;
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data: filename } = await axios
            .post("/uploadByLink", {
                link: photoLink,
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid link");
            });
        if (photoLink !== "") {
            setAddedPhoto((prev) => {
                return [...prev, filename];
            });
        } else {
            alert("You selected add photo without inputing link"); // Will need to work on inputting non image link
        }
        setPhotoLink("");
    }

    function uploadPhoto(e) {
        const files = e.target.files;
        // console.log({ files }); // <-- to check file
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append("photos", files[i]);
        }

        axios
            .post("/upload", data, {
                headers: { "Content-type": "multipart/form-data" },
            })
            .then((response) => {
                const { data: filenames } = response;
                setAddedPhoto((prev) => {
                    return [...prev, ...filenames];
                });
            });
    }

    return (
        <div>
            {action !== "new" && (
                <div className="text-center">
                    <Link
                        className="items-center inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                        to={"/account/myTrails/new"}>
                        <BiLocationPlus className="text-lg" />
                        add new trail
                    </Link>
                </div>
            )}
            {action === "new" && (
                <div>
                    <form className="mx-2">
                        {preInput("Title", "might need to remove later")}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="title : please input the trail's name"
                        />
                        {preInput("Location", "might need to remove later")}
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="location : please input the trail's location"
                        />
                        {preInput("Images", "might need to remove later")}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={photoLink}
                                onChange={(e) => setPhotoLink(e.target.value)}
                                placeholder={"URL LINK : to trail image"}
                            />
                            <button
                                onClick={addPhotoByLink}
                                className="bg-slate-200 px-4 rounded-2xl">
                                add&nbsp;photo
                            </button>
                        </div>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {addedPhoto.length > 0 &&
                                addedPhoto.map((link) => (
                                    <div key={link} className="h-32 flex">
                                        <img
                                            className="rounded-2xl w-full object-cover"
                                            src={`http://localhost:8000/uploads/${link}`}
                                            alt=""
                                        />
                                    </div>
                                ))}

                            {/* --UPLOAD-- */}

                            <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2 text-slate-500 text-xl gap-1">
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={uploadPhoto}
                                />
                                <BiImageAdd className="w-8 h-8" /> Upload
                            </label>
                        </div>
                        {preInput(
                            "Description",
                            "Please input valuable description"
                        )}
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {preInput(
                            "Amenities",
                            "Select all available amenities"
                        )}
                        <div className="mt-2 gap-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6">
                            <Amenities
                                selected={amenities}
                                onChange={setAmenities}
                            />
                        </div>
                        {preInput(
                            "Extra Info",
                            "If there is any useful tip aor things to aware"
                        )}
                        <textarea
                            value={extraInfo}
                            onChange={(e) => setExtraInfo(e.target.value)}
                        />
                        {preInput(
                            "Distance, Difficulty, and Hike Duration",
                            "might need to remove later"
                        )}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1 text-slate-500">
                                    Distance{" "}
                                    <span className="text-slate-500">
                                        (miles)
                                    </span>
                                </h3>
                                <input
                                    type="number"
                                    value={distance}
                                    onChange={(e) =>
                                        setDistance(e.target.value)
                                    }
                                    placeholder="5.6"
                                    min="1"
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1 text-slate-500">
                                    Difficulty Level{" "}
                                    <span className="text-slate-500">
                                        (1-10)
                                    </span>
                                </h3>
                                <input
                                    type="number"
                                    value={difficulty}
                                    onChange={(e) =>
                                        setDifficulty(e.target.value)
                                    }
                                    placeholder="3"
                                    min="1"
                                    max="10"
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1 text-slate-500">
                                    Duration{" "}
                                    <span className="text-slate-500">
                                        (hours)
                                    </span>
                                </h3>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                    placeholder="6"
                                    min="1"
                                />
                            </div>
                        </div>
                        <button className="primary mt-4">save my trail</button>
                    </form>
                </div>
            )}
        </div>
    );
}

// action !== "new" and action === "new"
// are used to define is the form should be rendered or not
