import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { teachers } from '@/lib/teachers';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teachers.map((teacher) => ({
    slug: teacher.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug }  = await params;
  const teacher = teachers.find((t) => t.slug === slug);

  if (!teacher) {
    return {
      title: 'Teacher Not Found',
    };
  }

  return {
    title: `${teacher.name} - ${teacher.role} | Engineers & Doctors School`,
    description: `Meet ${teacher.name}, our ${teacher.role} at Engineers & Doctors School. ${teacher.bio.substring(0, 150)}...`,
  };
}

export default async function TeacherDetail({ params }: Props) {
  const { slug }  = await params;
  const teacher = teachers.find((t) => t.slug === slug);

  if (!teacher) {
    notFound();
  }

  return (
    <>
      <section className="pager-section">
        <div className="container">
          <div className="pager-content text-center">
            <h2>Teacher Detail</h2>
            <ul>
              <li>
                <Link href="/" title="Home">Home</Link>
              </li>
              <li>
                <span>Teacher Detail</span>
              </li>
            </ul>
          </div>
          {/* pager-content end */}
          <h2 className="page-titlee">E&D</h2>
        </div>
      </section>

      <section className="teacher-single-section">
        <div className="container">
          <div className="teacher-single-page">
            <div className="row">
              <div className="col-lg-4">
                <div className="teacher-coly">
                  <Image 
                    src={teacher.detailImage} 
                    alt={teacher.name} 
                    width={500} 
                    height={600} 
                    style={{ width: '100%', height: 'auto' }} 
                  />
                  <ul className="social-icons">
                    {teacher.socials.facebook && (
                      <li>
                        <a href={teacher.socials.facebook} title="Facebook" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                    )}
                    {teacher.socials.twitter && (
                      <li>
                        <a href={teacher.socials.twitter} title="Twitter" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                    )}
                    {teacher.socials.linkedin && (
                      <li>
                        <a href={teacher.socials.linkedin} title="LinkedIn" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    )}
                    {teacher.socials.instagram && (
                      <li>
                        <a href={teacher.socials.instagram} title="Instagram" target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                {/* teacher-coly end */}
              </div>

              <div className="col-lg-8">
                <div className="teacher-content">
                  <h3>{teacher.name}</h3>
                  <p>{teacher.role}</p>
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                      <div className="rol-z">
                        <Image src="/webImages/ro2.png" alt="icon" width={40} height={40} />
                        <div className="rol-info">
                          <h3>Email</h3>
                          <span>{teacher.email}</span>
                        </div>
                      </div>
                      {/* rol-z end */}
                    </div>
                  </div>

                  <p>{teacher.bio}</p>

                  <ul className="tech-detils">
                    <li>
                      <h3>DOB</h3>
                      <span>{teacher.dob}</span>
                    </li>
                    <li>
                      <h3>Education</h3>
                      <span>{teacher.education}</span>
                    </li>
                    <li>
                      <h3>Experience</h3>
                      <span>{teacher.experience}</span>
                    </li>
                  </ul>
                  {/* tech-detils end */}

                  <div className="skills-tech">
                    <h3>Personal Skills</h3>
                    {teacher.skills.map((skill, index) => (
                      <div className="progess-row" key={index}>
                        <h3>{skill.name}</h3>
                        <div className="progress">
                          <div
                            className={`progress-bar wow slideInLeft`}
                            data-wow-duration="1000ms"
                            role="progressbar"
                            style={{ 
                              width: `${skill.percentage}%`, 
                              visibility: 'visible', 
                              backgroundColor: skill.color 
                            }}
                            aria-valuenow={skill.percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <span>{skill.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* teachers-section start */}
          <section className="teachers-section">
            <div className="container">
              <div className="section-title text-center">
                <h2>
                  Meet Our<br />
                  Teachers
                </h2>
                <p>
                  Our teaching team combines strong subject expertise with care and guidance,
                  helping students learn confidently through modern, student-centered methods.
                </p>
              </div>
              {/* section-title end */}

              <div className="teachers">
                <div className="row">
                  {teachers.map((t) => (
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6 full-wdth" key={t.slug}>
                      <div className="teacher">
                        <div className="teacher-img">
                          <Image 
                            src={t.image} 
                            alt={t.name} 
                            width={300} 
                            height={350} 
                            style={{ width: '100%', height: 'auto' }} 
                          />
                          <div className="sc-div">
                            <ul>
                              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                              <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                              <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            </ul>
                            <span>
                              <Image src="/webImages/plus.png" alt="plus" width={20} height={20} />
                            </span>
                          </div>
                        </div>
                        <div className="teacher-info">
                          <h3>
                            <Link href={`/teachers/${t.slug}`} title={t.name}>
                              {t.name}
                            </Link>
                          </h3>
                          <span>{t.role}</span>
                        </div>
                      </div>
                      {/* teacher end */}
                    </div>
                  ))}
                </div>
              </div>
              {/* teachers end */}
            </div>
          </section>
          {/* teachers-section end */}
        </div>
      </section>

      {/* newsletter-sec starts */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-sec">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="newsz-ltr-text">
                  <h2>Build Your Career<br />With Us</h2>
                </div>
                {/* newsz-ltr-text end */}
              </div>

              <div className="col-lg-6">
                <Link href="/career" title="Career Opportunities" className="btn-default">
                  Career Opportunities <i className="fa fa-long-arrow-alt-right"></i>
                </Link>
                {/* newsletter-form end */}
              </div>
            </div>
          </div>
          {/* newsletter-sec end */}
        </div>
      </section>
      {/* newsletter-sec end */}
    </>
  );
}
