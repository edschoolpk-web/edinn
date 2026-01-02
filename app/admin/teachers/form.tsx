"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { createTeacher, updateTeacher } from "@/app/actions/teacher";
import { useRouter } from "next/navigation";

// Types matching the Prisma model loosely
type TeacherFormData = {
  name: string;
  role: string;
  email: string;
  bio: string;
  dob: string;
  education: string;
  experience: string;
  skills: { name: string; percentage: number; color: string }[];
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
};

export function TeacherForm({ teacher }: { teacher?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(teacher?.image || null);
  const [detailImagePreview, setDetailImagePreview] = useState<string | null>(teacher?.detailImage || null);

  const { register, control, handleSubmit, formState: { errors } } = useForm<TeacherFormData>({
    defaultValues: {
      name: teacher?.name || "",
      role: teacher?.role || "",
      email: teacher?.email || "",
      bio: teacher?.bio || "",
      dob: teacher?.dob || "",
      education: teacher?.education || "",
      experience: teacher?.experience || "",
      skills: teacher?.skills || [],
      socials: teacher?.socials || {},
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const onSubmit = async (data: TeacherFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      formData.append("dob", data.dob);
      formData.append("education", data.education);
      formData.append("experience", data.experience);
      formData.append("skills", JSON.stringify(data.skills));
      formData.append("socials", JSON.stringify(data.socials));

      const imageInput = document.getElementById("image") as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        formData.append("image", imageInput.files[0]);
      }

      const detailImageInput = document.getElementById("detailImage") as HTMLInputElement;
      if (detailImageInput?.files?.[0]) {
        formData.append("detailImage", detailImageInput.files[0]);
      }

      if (teacher) {
        await updateTeacher(teacher.id, formData);
      } else {
        await createTeacher(formData);
      }
      
      router.push("/admin/teachers");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setPreview: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 md:p-12 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
      
      {/* Basic Info */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#2B3674] px-1">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Name</label>
            <input 
              {...register("name", { required: true })} 
              className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none placeholder:text-gray-400"
              placeholder="e.g. Sir Gohar"
            />
            {errors.name && <span className="text-red-500 text-sm mt-1 ml-1 block">Name is required</span>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Role</label>
            <input 
              {...register("role", { required: true })} 
              className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none placeholder:text-gray-400"
              placeholder="e.g. Mathematics Teacher"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email</label>
            <input 
              {...register("email")} 
              className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none placeholder:text-gray-400"
              placeholder="teacher@edschool.pk"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Date of Birth</label>
            <input 
              {...register("dob")} 
              className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none placeholder:text-gray-400" 
              placeholder="DD.MM.YYYY" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Education</label>
            <input 
              {...register("education")} 
              className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none placeholder:text-gray-400"
              placeholder="e.g. MSc Mathematics"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Experience</label>
            <input 
              {...register("experience")} 
              className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none placeholder:text-gray-400"
              placeholder="e.g. 8 Years"
            />
          </div>
        </div>

        <div>
           <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Biography</label>
           <textarea 
             {...register("bio")} 
             rows={5} 
             className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none resize-none placeholder:text-gray-400"
             placeholder="Write a brief biography..."
           />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Images */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#2B3674] px-1">Profile Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#4318FF] transition-colors group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Main Image (Card)</label>
              <input 
                  type="file" 
                  id="image" 
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setImagePreview)}
                  className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#4318FF] file:text-white
                    hover:file:bg-[#3311CC]
                    cursor-pointer"
              />
              {imagePreview && (
                  <div className="mt-4 relative w-full aspect-square md:w-40 md:h-40 rounded-xl overflow-hidden shadow-md border-2 border-white">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
              )}
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#4318FF] transition-colors group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Detail Image (Banner)</label>
              <input 
                  type="file" 
                  id="detailImage" 
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setDetailImagePreview)}
                  className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#4318FF] file:text-white
                    hover:file:bg-[#3311CC]
                    cursor-pointer"
              />
              {detailImagePreview && (
                  <div className="mt-4 relative w-full aspect-video md:w-60 md:h-32 rounded-xl overflow-hidden shadow-md border-2 border-white">
                      <Image src={detailImagePreview} alt="Preview" fill className="object-cover" />
                  </div>
              )}
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Skills */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#2B3674] px-1">Professional Skills</h3>
            <button 
                type="button" 
                onClick={() => append({ name: "", percentage: 80, color: "#ed1b2e" })}
                className="text-sm bg-[#4318FF] text-white px-4 py-2 rounded-full hover:bg-[#3311CC] transition-colors font-medium"
            >
                + Add Skill
            </button>
        </div>
        <div className="space-y-4">
            {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col md:flex-row gap-4 items-end bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="w-full md:flex-1">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Skill Name</label>
                        <input 
                          {...register(`skills.${index}.name` as const)} 
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent outline-none" 
                          placeholder="e.g. Communication"
                        />
                    </div>
                    <div className="w-full md:w-32">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Percentage</label>
                        <input 
                          type="number" 
                          {...register(`skills.${index}.percentage` as const)} 
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent outline-none" 
                        />
                    </div>
                    <div className="w-full md:w-24">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Color</label>
                        <input 
                          type="color" 
                          {...register(`skills.${index}.color` as const)} 
                          className="w-full h-[46px] p-1 border border-gray-200 rounded-lg cursor-pointer bg-white" 
                        />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => remove(index)} 
                      className="p-3 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      title="Remove Skill"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            ))}
            {fields.length === 0 && (
              <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                No skills added yet. Click "+ Add Skill" to start.
              </div>
            )}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Socials */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[#2B3674] px-1">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {['facebook', 'linkedin', 'instagram', 'twitter'].map((platform) => (
               <div key={platform}>
                   <label className="capitalize block text-sm font-semibold text-gray-700 mb-2 ml-1">
                     <i className={`fab fa-${platform === 'facebook' ? 'facebook-f' : platform === 'linkedin' ? 'linkedin-in' : platform} mr-2 text-gray-400 w-4`}></i>
                     {platform}
                   </label>
                   <input 
                     {...register(`socials.${platform}` as any)} 
                     className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-all duration-200 outline-none placeholder:text-gray-400" 
                     placeholder={`https://${platform}.com/...`} 
                   />
               </div>
           ))}
        </div>
      </div>

      {/* Sticky Footer for Save */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md p-4 -mx-8 -mb-8 rounded-b-[30px] flex justify-end border-t border-gray-100 mt-8 z-10">
        <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#4318FF] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#3311CC] transition-all shadow-lg hover:shadow-xl shadow-[#4318FF]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 transform active:scale-95"
        >
            {isSubmitting ? (
              <>
                <i className="fas fa-circle-notch fa-spin"></i>
                Saving Changes...
              </>
            ) : (
              <>
                Save Changes 
                <i className="fas fa-check"></i>
              </>
            )}
        </button>
      </div>
    </form>
  );
}
