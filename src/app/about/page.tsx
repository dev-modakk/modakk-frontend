'use client';

import React from 'react';
import Link from 'next/link';
import { LuGift, LuHeart, LuStar, LuUsers, LuTruck, LuShield, LuRecycle, LuGlobe, LuAward, LuTarget, LuMail, LuMapPin, LuPhone } from 'react-icons/lu';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <LuHeart className="w-6 h-6" />,
      title: "Joy First",
      description: "Every gift box is designed to spark genuine joy and create unforgettable moments for children and families."
    },
    {
      icon: <LuStar className="w-6 h-6" />,
      title: "Quality Matters",
      description: "We carefully curate only the highest quality products from trusted brands that meet our strict safety standards."
    },
    {
      icon: <LuUsers className="w-6 h-6" />,
      title: "Family Focused",
      description: "Understanding that every family is unique, we create diverse gift options that celebrate different interests and ages."
    },
    {
      icon: <LuRecycle className="w-6 h-6" />,
      title: "Sustainable Future",
      description: "We're committed to eco-friendly packaging and supporting brands that share our environmental values."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Mitchell",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop",
      bio: "A mother of two with 15 years in retail, Sarah founded Modakk to solve the challenge of finding perfect gifts for children."
    },
    {
      name: "James Chen",
      role: "Head of Curation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      bio: "Former toy industry executive who ensures every product meets our quality and safety standards."
    },
    {
      name: "Emma Rodriguez",
      role: "Customer Experience Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      bio: "Passionate about creating magical unboxing experiences and building lasting relationships with families."
    },
    {
      name: "Michael Thompson",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "Logistics expert ensuring every gift box arrives on time and in perfect condition across New Zealand."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Families" },
    { number: "50,000+", label: "Gift Boxes Delivered" },
    { number: "4.9/5", label: "Customer Rating" },
    { number: "98%", label: "Would Recommend" }
  ];

  const certifications = [
    { name: "Safety Certified", icon: <LuShield className="w-5 h-5" /> },
    { name: "Eco-Friendly", icon: <LuRecycle className="w-5 h-5" /> },
    { name: "Quality Assured", icon: <LuAward className="w-5 h-5" /> },
    { name: "Fast Delivery", icon: <LuTruck className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-white">

      <div className="bg-slate-900 text-white py-20 px-6 sm:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-8">
            <LuGift className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
            Creating Magic,<br />
            <span className="text-blue-400">One Box at a Time</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            We believe every child deserves moments of pure joy. Our mission is to deliver carefully curated gift boxes that spark imagination and create lasting memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/kids-gift-boxes"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:scale-105"
            >
              Shop Gift Boxes
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border-2 border-slate-500 text-white hover:bg-slate-800 font-semibold text-lg rounded-xl transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-slate-600 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <div className="text-lg sm:text-xl text-slate-700 leading-relaxed space-y-8">
              <p className="text-2xl text-slate-900 font-medium leading-relaxed">
                Modakk was born from a simple frustration: finding the perfect gift for a child shouldn't be so difficult.
              </p>
              <p>
                As parents ourselves, we knew the joy that comes from seeing a child's face light up when they receive something truly special. We also knew the stress of wandering store aisles, unsure if we were choosing something that would genuinely delight a young recipient.
              </p>
              <p>
                Founded in 2023 in Auckland, New Zealand, we set out to solve this challenge by creating carefully curated gift boxes that take the guesswork out of gift-giving. Each box is thoughtfully designed by our team of parents, educators, and child development experts who understand what makes children tick.
              </p>
              <p>
                Today, we're proud to have delivered joy to over 10,000 families across New Zealand and Australia, with plans to expand our mission of spreading happiness to children worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
              Our Values
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              These core principles guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
              Meet Our Team
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The passionate people behind Modakk who work every day to bring joy to families.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-slate-100 group-hover:border-blue-200 transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 font-semibold mb-4 uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-12"></div>
          <p className="text-xl sm:text-2xl mb-12 leading-relaxed text-slate-300">
            To spark joy, creativity, and wonder in children's lives through thoughtfully curated gift experiences that bring families together and create lasting memories.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex flex-col items-center gap-3 p-6 bg-slate-800 rounded-xl border border-slate-700">
                <div className="text-blue-400">
                  {cert.icon}
                </div>
                <span className="text-sm font-medium text-center">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
              Supporting Our Community
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We believe in giving back to the communities that support us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center">
                  <LuStar className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Starship Foundation</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                We're proud partners with Starship Foundation, donating a portion of our proceeds to support children's healthcare and bringing gift boxes to young patients in hospitals.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                  <LuRecycle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Eco Initiative</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                All our packaging is 100% recyclable, and we partner with local environmental groups to plant a tree for every 10 gift boxes sold.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
              Get in Touch
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have questions or want to learn more about our mission? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <LuMail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Email Us</h3>
              <p className="text-slate-600 mb-4">For general inquiries</p>
              <a href="mailto:hello@modakk.co.nz" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
                hello@modakk.co.nz
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <LuPhone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Call Us</h3>
              <p className="text-slate-600 mb-4">Mon-Fri, 9am-5pm NZST</p>
              <a href="tel:+64221290418" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
                +64 22 129 0418
              </a>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <LuMapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visit Us</h3>
              <p className="text-slate-600 leading-relaxed">
                P.O. Box 36110 Northcote 0748<br />
                Auckland, New Zealand
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;