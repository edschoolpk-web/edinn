import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DeleteTeacherButton } from "./DeleteTeacherButton";
import { Teacher, Skill, Social } from "@prisma/client";
import { Reorder } from "framer-motion";
import { updateTeacherOrder } from "@/app/actions/teacher";
import toast from "react-hot-toast";

type TeacherWithRelations = Teacher & {
    skills: Skill[];
    socials: Social | null;
};

export default function TeachersListClient({ teachers }: { teachers: TeacherWithRelations[] }) {
    const [items, setItems] = useState(teachers);
    const [hasChanged, setHasChanged] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setItems(teachers);
    }, [teachers]);

    const handleReorder = (newOrder: TeacherWithRelations[]) => {
        setItems(newOrder);
        setHasChanged(true);
    };

    const handleSaveOrder = async () => {
        setIsSaving(true);
        // Create payload with new sortOrder based on index
        const updates = items.map((teacher, index) => ({
            id: teacher.id,
            sortOrder: index
        }));

        const result = await updateTeacherOrder(updates);
        if (result.success) {
            toast.success("Order updated successfully");
            setHasChanged(false);
        } else {
            toast.error("Failed to update order");
        }
        setIsSaving(false);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Teachers</h1>
                    <p>Manage your academic staff and their profiles. Drag to reorder.</p>
                </div>
                <div className="flex gap-3">
                    {hasChanged && (
                        <button
                            onClick={handleSaveOrder}
                            disabled={isSaving}
                            className="save-order-btn"
                        >
                            {isSaving ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-save"></i>}
                            Save Order
                        </button>
                    )}
                    <Link
                        href="/admin/teachers/new"
                        className="add-btn"
                    >
                        <i className="fas fa-plus"></i> Add New Teacher
                    </Link>
                </div>
            </div>

            <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="teachers-list">
                {items.map((teacher) => (
                    <Reorder.Item key={teacher.id} value={teacher} className="teacher-list-item">
                        <div className="teacher-card-row group">
                            <div className="drag-handle">
                                <i className="fas fa-grip-vertical"></i>
                            </div>
                            
                            <div className="card-image-wrapper-row relative">
                                {teacher.image ? (
                                    <Image
                                        src={teacher.image}
                                        alt={teacher.name}
                                        fill
                                        className="object-cover rounded-lg"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E0E5F2] to-[#F4F7FE] rounded-lg">
                                        <div className="w-8 h-8 rounded-full bg-white text-[#4318FF] text-lg font-bold flex items-center justify-center shadow-sm">
                                            {teacher.name.charAt(0)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="card-content-row flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="teacher-name-row">{teacher.name}</h3>
                                        <div className="teacher-role-badge">{teacher.role}</div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <DeleteTeacherButton id={teacher.id} />
                                        <Link href={`/admin/teachers/${teacher.id}`} className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors border border-gray-100">
                                            <i className="fas fa-edit text-xs"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="teacher-stats-row mt-2">
                                    <div className="stat">
                                        <i className="fas fa-graduation-cap"></i>
                                        <span>{teacher.education}</span>
                                    </div>
                                    <div className="stat">
                                        <i className="fas fa-briefcase"></i>
                                        <span>{teacher.experience}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            {items.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon-box">
                        <i className="fas fa-chalkboard-teacher"></i>
                    </div>
                    <h3>No Teachers Found</h3>
                    <p>Get started by adding your first teacher profile to the system.</p>
                </div>
            )}

            <style jsx>{`
        .page-container {
            animation: fadeIn 0.5s ease;
            max-width: 1000px;
            margin: 0 auto;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .page-header h1 { font-size: 28px; font-weight: 700; color: #2B3674; margin: 0; }
        .page-header p { color: #A3AED0; margin: 5px 0 0; }

        .add-btn {
            background: linear-gradient(90deg, #4318FF 0%, #868CFF 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(67, 24, 255, 0.2);
            height: 48px;
        }
        .add-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(67, 24, 255, 0.3); }

        .save-order-btn {
            background: #FF9800;
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.2s;
            box-shadow: 0 4px 10px rgba(255, 152, 0, 0.2);
            height: 48px;
        }
        .save-order-btn:hover { background: #F57C00; transform: translateY(-2px); }
        .save-order-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .teachers-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .teacher-list-item {
            list-style: none;
        }

        .teacher-card-row {
            background: white;
            border-radius: 16px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
            border: 1px solid rgba(0,0,0,0.02);
            transition: all 0.2s;
            cursor: grab;
        }
        .teacher-card-row:active { cursor: grabbing; box-shadow: 0 5px 20px rgba(0,0,0,0.05); }

        .drag-handle {
            color: #A3AED0;
            cursor: grab;
            padding: 10px;
        }
        .drag-handle:active { cursor: grabbing; color: #4318FF; }

        .card-image-wrapper-row {
            width: 80px;
            height: 80px;
            flex-shrink: 0;
        }

        .teacher-name-row {
            margin: 0 0 5px;
            color: #2B3674;
            font-size: 18px;
            font-weight: 700;
        }

        .teacher-role-badge {
            display: inline-block;
            background: #F4F7FE;
            color: #4318FF;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 20px;
        }

        .teacher-stats-row {
            display: flex;
            gap: 20px;
            color: #A3AED0;
            font-size: 13px;
        }
        
        .stat { display: flex; align-items: center; gap: 6px; }

        .empty-state {
            padding: 60px 20px;
            text-align: center;
            background: white;
            border-radius: 20px;
            border: 1px dashed #E0E5F2;
        }
        
        .empty-icon-box {
            width: 60px; height: 60px;
            border-radius: 50%;
            background: #F4F7FE;
            color: #A3AED0;
            display: flex; align-items: center; justify-content: center;
            font-size: 24px;
            margin: 0 auto 20px;
        }
        
        .empty-state h3 { color: #2B3674; margin: 0 0 10px; }
        .empty-state p { color: #A3AED0; margin: 0; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    );
}
