// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeTier } from "../features/tiers/tier.Slice";
// import { tierSlice } from "../features/tiers/tier.Slice";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./TierList.css";
// import { useState, useEffect } from "react";

// function TierList() {
//     // const tiers = useSelector((state) => state.tiers);
//     const dispatch = useDispatch();
//     const [isCameraEnabled, setIsCameraEnabled] = useState(false);

//     const [tiers, setTiers] = useState(() => {
//         const savedTiers = localStorage.getItem("tiers");
//         return savedTiers ? JSON.parse(savedTiers) : [];
//     });

//     const [photos, setPhotos] = useState(() => {
//         const savedPhotos = localStorage.getItem("photos");
//         return savedPhotos ? JSON.parse(savedPhotos) : [];
//     });

//     const [newTierName, setNewTierName] = useState("");
//     const [newTierColor, setNewTierColor] = useState("#ffffff");

//     useEffect(() => {
//         localStorage.setItem("tiers", JSON.stringify(tiers));
//     }, [tiers]);

//     useEffect(() => {
//         localStorage.setItem("photos", JSON.stringify(photos));
//     }, [photos]);

//     const handleAddTier = () => {
//         setTiers([
//             ...tiers,
//             { name: newTierName, color: newTierColor, items: [] },
//         ]);
//         setNewTierName("");
//         setNewTierColor("#ffffff");
//     };

//     const handleAddPhotos = (e) => {
//         const files = Array.from(e.target.files);
//         const newPhotos = files.map((file) => URL.createObjectURL(file));
//         setPhotos([...photos, ...newPhotos]);
//     };

//     const handleDragEnd = (result) => {
//         if (!result.destination) return;
//         const { source, destination } = result;

//         if (
//             source.droppableId === "photos" &&
//             destination.droppableId !== "photos"
//         ) {
//             const photo = photos[source.index];
//             const updatedPhotos = [...photos];
//             updatedPhotos.splice(source.index, 1);

//             const updatedTiers = tiers.map((tier, index) => {
//                 if (index.toString() === destination.droppableId) {
//                     return { ...tier, items: [...tier.items, photo] };
//                 }
//                 return tier;
//             });

//             setPhotos(updatedPhotos);
//             setTiers(updatedTiers);
//         } else if (
//             source.droppableId !== "photos" &&
//             destination.droppableId === "photos"
//         ) {
//             const tierIndex = parseInt(source.droppableId, 10);
//             const photo = tiers[tierIndex].items[source.index];
//             const updatedTiers = tiers.map((tier, index) => {
//                 if (index === tierIndex) {
//                     return {
//                         ...tier,
//                         items: tier.items.filter(
//                             (_, idx) => idx !== source.index
//                         ),
//                     };
//                 }
//                 return tier;
//             });

//             const updatedPhotos = [...photos];
//             updatedPhotos.splice(destination.index, 0, photo);

//             setTiers(updatedTiers);
//             setPhotos(updatedPhotos);
//         } else {
//             const sourceTierIndex = parseInt(source.droppableId, 10);
//             const destinationTierIndex = parseInt(destination.droppableId, 10);

//             const photo = tiers[sourceTierIndex].items[source.index];
//             const updatedTiers = tiers.map((tier, index) => {
//                 if (index === sourceTierIndex) {
//                     return {
//                         ...tier,
//                         items: tier.items.filter(
//                             (_, idx) => idx !== source.index
//                         ),
//                     };
//                 }
//                 if (index === destinationTierIndex) {
//                     return {
//                         ...tier,
//                         items: [
//                             ...tier.items.slice(0, destination.index),
//                             photo,
//                             ...tier.items.slice(destination.index),
//                         ],
//                     };
//                 }
//                 return tier;
//             });

//             setTiers(updatedTiers);
//         }
//     };

//     const enableCamera = async () => {
//         if (!isCameraEnabled) {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 video: true,
//             });
//             const videoElement = document.getElementById("camera-feed");
//             videoElement.srcObject = stream;
//             videoElement.play();
//         } else {
//             const videoElement = document.getElementById("camera-feed");
//             const stream = videoElement.srcObject;
//             const tracks = stream.getTracks();

//             tracks.forEach((track) => track.stop());
//             videoElement.srcObject = null;
//         }
//         setIsCameraEnabled(!isCameraEnabled);
//     };

//     // const color = tier.color;
//     // console.log(color)

//     return (
//         <>
//             <div className=" absolute flex flex-col bg-black text-white h-screen w-full">
//                 <div>
//                     <h1 className=" text-6xl pt-3 font-extrabold text-center italic drop-shadow-2xl">
//                         Rank it UP
//                     </h1>
//                 </div>
//                 <div className="pt-2 bg-black">
//                     <DragDropContext onDragEnd={handleDragEnd}>
//                         {tiers.map((tier, index) => (
//                             <Droppable
//                                 key={index}
//                                 droppableId={index.toString()}
//                             >
//                                 {(provided) => (
//                                     <div
//                                         className="mx-3 my-1  items-center flex gap-1 h-28 bg-gray-950"
//                                         ref={provided.innerRef}
//                                         {...provided.droppableProps}
//                                     >
//                                         <h2
//                                             className="flex items-center text-center justify-center w-28 min-w-max pr-1 h-28"
//                                             style={{
//                                                 backgroundColor: tier.color,
//                                             }}
//                                         >
//                                             {tier.name}
//                                         </h2>
//                                         {tier.items.map((item, idx) => (
//                                             <Draggable
//                                                 key={item}
//                                                 draggableId={item}
//                                                 index={idx}
//                                             >
//                                                 {(provided) => (
//                                                     <img
//                                                         className=" h-28 w-28 bg-cover flex flex-row"
//                                                         src={item}
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         alt="Tier Item"
//                                                     />
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         ))}

//                         <Droppable droppableId="photos" direction="horizontal">
//                             {(provided) => (
//                                 <div>
//                                     <div className=" mt-5 mx-5 px-5 rounded-md flex flex-row">Add some photos 👇
//                                     </div>
//                                 <div placeholder="Add some photos using choose files"
//                                     className=" bg-gray-900 mt-1 h-32 mx-5 rounded-md flex flex-row "
//                                     ref={provided.innerRef}
//                                     {...provided.droppableProps}
//                                 >
//                                     {photos.map((photo, index) => (
//                                         <Draggable
//                                             key={photo}
//                                             draggableId={photo}
//                                             index={index}
//                                         >
//                                             {(provided) => (
//                                                 <img
//                                                     className=" h-28 w-28"
//                                                     src={photo}
//                                                     ref={provided.innerRef}
//                                                     {...provided.draggableProps}
//                                                     {...provided.dragHandleProps}
//                                                     alt="Uploaded"
//                                                 />
//                                             )}
//                                         </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                 </div>
//                                 </div>
//                             )}
//                         </Droppable>

//                         {/* Image collection ends here */}

//                         {/* tiers starts here */}
//                     </DragDropContext>
//                 </div>
//                 <div className=" bg-black justify-end flex flex-col gap-2 flex-grow items-center ">
//                     <div className="flex gap-6 h-12 m-5">
//                         <input
//                             required
//                             className=" text-black h-12 w-52 outline-orange-400 rounded-md items-center flex text-center  "
//                             type="text"
//                             value={newTierName}
//                             onChange={(e) => setNewTierName(e.target.value)}
//                             placeholder="Tier Name"
//                         />
//                         <div className="flex items-center gap-2">
//                             Pick color ➡️
//                             <input
//                                 className=" h-12 border-none rounded-md bg-black "
//                                 type="color"
//                                 placeholder="Pick color"
//                                 value={newTierColor}
//                                 onChange={(e) =>
//                                     setNewTierColor(e.target.value)
//                                 }
//                             />{" "}
//                         </div>

//                         <button
//                             className=" bg-gray-800 p-4 items-center flex rounded-md hover:bg-slate-500 transition-all outline-sky-500 outline-2"
//                             onClick={handleAddTier}
//                         >
//                             Add Tier
//                         </button>
//                         <input
//                             className=" bg-black  items-center flex py-2 text-white"
//                             type="file"
//                             multiple
//                             onChange={handleAddPhotos}
//                         />
//                         <button
//                             className=" bg-gray-500 ml-20 w-48 rounded-md hover:bg-sky-500"
//                             onClick={enableCamera}
//                         >
//                             {isCameraEnabled
//                                 ? "Hide Reactions"
//                                 : "See Reactions"}
//                         </button>
//                         <video id="camera-feed" />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default TierList;


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTier } from "../features/tiers/tier.Slice";
import { tierSlice } from "../features/tiers/tier.Slice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TierList.css";
import { useState, useEffect } from "react";

function TierList() {
    // const tiers = useSelector((state) => state.tiers);
    const dispatch = useDispatch();
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);

    const [tiers, setTiers] = useState(() => {
        const savedTiers = localStorage.getItem("tiers");
        return savedTiers ? JSON.parse(savedTiers) : [];
    });

    const [photos, setPhotos] = useState(() => {
        const savedPhotos = localStorage.getItem("photos");
        return savedPhotos ? JSON.parse(savedPhotos) : [];
    });

    const [newTierName, setNewTierName] = useState("");
    const [newTierColor, setNewTierColor] = useState("#ffffff");

    useEffect(() => {
        localStorage.setItem("tiers", JSON.stringify(tiers));
    }, [tiers]);

    useEffect(() => {
        localStorage.setItem("photos", JSON.stringify(photos));
    }, [photos]);

    const handleAddTier = () => {
        setTiers([
            ...tiers,
            { name: newTierName, color: newTierColor, items: [] },
        ]);
        setNewTierName("");
        setNewTierColor("#ffffff");
    };

    const handleAddPhotos = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.map((file) => URL.createObjectURL(file));
        setPhotos([...photos, ...newPhotos]);
    };

    const handleDeleteTier = (index) => {
        setTiers(tiers.filter((_, i) => i !== index));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (
            source.droppableId === "photos" &&
            destination.droppableId !== "photos"
        ) {
            const photo = photos[source.index];
            const updatedPhotos = [...photos];
            updatedPhotos.splice(source.index, 1);

            const updatedTiers = tiers.map((tier, index) => {
                if (index.toString() === destination.droppableId) {
                    return { ...tier, items: [...tier.items, photo] };
                }
                return tier;
            });

            setPhotos(updatedPhotos);
            setTiers(updatedTiers);
        } else if (
            source.droppableId !== "photos" &&
            destination.droppableId === "photos"
        ) {
            const tierIndex = parseInt(source.droppableId, 10);
            const photo = tiers[tierIndex].items[source.index];
            const updatedTiers = tiers.map((tier, index) => {
                if (index === tierIndex) {
                    return {
                        ...tier,
                        items: tier.items.filter(
                            (_, idx) => idx !== source.index
                        ),
                    };
                }
                return tier;
            });

            const updatedPhotos = [...photos];
            updatedPhotos.splice(destination.index, 0, photo);

            setTiers(updatedTiers);
            setPhotos(updatedPhotos);
        } else {
            const sourceTierIndex = parseInt(source.droppableId, 10);
            const destinationTierIndex = parseInt(destination.droppableId, 10);

            const photo = tiers[sourceTierIndex].items[source.index];
            const updatedTiers = tiers.map((tier, index) => {
                if (index === sourceTierIndex) {
                    return {
                        ...tier,
                        items: tier.items.filter(
                            (_, idx) => idx !== source.index
                        ),
                    };
                }
                if (index === destinationTierIndex) {
                    return {
                        ...tier,
                        items: [
                            ...tier.items.slice(0, destination.index),
                            photo,
                            ...tier.items.slice(destination.index),
                        ],
                    };
                }
                return tier;
            });

            setTiers(updatedTiers);
        }
    };

    const enableCamera = async () => {
        if (!isCameraEnabled) {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            const videoElement = document.getElementById("camera-feed");
            videoElement.srcObject = stream;
            videoElement.play();
        } else {
            const videoElement = document.getElementById("camera-feed");
            const stream = videoElement.srcObject;
            const tracks = stream.getTracks();

            tracks.forEach((track) => track.stop());
            videoElement.srcObject = null;
        }
        setIsCameraEnabled(!isCameraEnabled);
    };

    return (
        <>
            <div className="absolute flex flex-col bg-black text-white h-screen w-full">
                <div>
                    <h1 className="text-6xl pt-3 font-extrabold text-center italic drop-shadow-2xl">
                        Rank it UP
                    </h1>
                </div>
                <div className="pt-2 bg-black">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {tiers.map((tier, index) => (
                            <Droppable
                                key={index}
                                droppableId={index.toString()}
                            >
                                {(provided) => (
                                    <div
                                        className=" my-1 items-center flex mx-3  flex-row gap-1 h-28 bg-gray-950"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h2
                                            className="flex items-center text-center justify-center w-28 min-w-max pr-1 h-28"
                                            style={{
                                                backgroundColor: tier.color,
                                            }}
                                        >
                                            {tier.name}
                                        </h2>
                                        {tier.items.map((item, idx) => (
                                            <Draggable
                                                key={item}
                                                draggableId={item}
                                                index={idx}
                                            >
                                                {(provided) => (
                                                    <img
                                                        className="h-28 w-28 bg-cover flex flex-row"
                                                        src={item}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        alt="Tier Item"
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        <button
                                            className=" ml-auto mr-5 bg-red-600 hover:bg-sky-500 drop-shadow-lg text-white p-2 rounded"
                                            onClick={() => handleDeleteTier(index)}
                                        >
                                           ☠️
                                        </button>
                                    </div>
                                )}
                            </Droppable>
                        ))}

                        <Droppable droppableId="photos" direction="horizontal">
                            {(provided) => (
                                <div>
                                    <div className="mt-5 mx-5 px-5 rounded-md flex flex-row">
                                        Add some photos 👇
                                    </div>
                                    <div
                                        placeholder="Add some photos using choose files"
                                        className="bg-gray-900 mt-1 h-32 mx-5 rounded-md flex flex-row"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {photos.map((photo, index) => (
                                            <Draggable
                                                key={photo}
                                                draggableId={photo}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <img
                                                        className="h-28 w-28"
                                                        src={photo}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        alt="Uploaded"
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <div className="bg-black justify-end flex flex-col gap-2 flex-grow items-center mb-8">
                    <div className="flex gap-6 h-12 m-5">
                        <input
                            required
                            className="text-black h-12 w-52 outline-orange-400 rounded-md items-center flex text-center"
                            type="text"
                            value={newTierName}
                            onChange={(e) => setNewTierName(e.target.value)}
                            placeholder="Tier Name"
                        />
                        <div className="flex items-center gap-2">
                            Pick color ➡️
                            <input
                                className="h-12 border-none rounded-md bg-black"
                                type="color"
                                placeholder="Pick color"
                                value={newTierColor}
                                onChange={(e) =>
                                    setNewTierColor(e.target.value)
                                }
                            />{" "}
                        </div>
                        <button
                            className="bg-gray-800 p-4 items-center flex rounded-md hover:bg-slate-500 transition-all outline-sky-500 outline-2"
                            onClick={handleAddTier}
                        >
                            Add Tier
                        </button>
                        <input
                            className="bg-black items-center flex py-2 text-white"
                            type="file"
                            multiple
                            onChange={handleAddPhotos}
                        />
                        <button
                            className="bg-gray-500 ml-20 w-48 rounded-md hover:bg-sky-500"
                            onClick={enableCamera}
                        >
                            {isCameraEnabled
                                ? "Hide Reactions"
                                : "See Reactions"}
                        </button>
                        <video id="camera-feed" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TierList;
