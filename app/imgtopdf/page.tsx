'use client'

import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileUpload } from '@/components/ui/file-upload';
import { LoaderThree } from '@/components/ui/loader';
import ArticalAds from '@/components/ads/ArticalAdd';

export default function ImagesToPDFPreview() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isLoading, setisLoading] = useState<boolean>(false)

    const handleFiles = async (files: File[]) => {
        const pdf = new jsPDF();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imgData = await readAsDataURL(file);

            const img = new Image();
            img.src = imgData;

            await new Promise((resolve) => {
                img.onload = () => {
                    const imgWidth = 210; // A4 size in mm
                    const imgHeight = (img.height * imgWidth) / img.width;

                    if (i !== 0) pdf.addPage();
                    pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
                    setTimeout(() => {
                        
                        setisLoading(false);
                    }, 2000);

                    resolve(true);
                };
            });
        }

        const pdfBlob = pdf.output('blob');
        const blobUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(blobUrl); // Set for iframe
    };

    const readAsDataURL = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    return (
        <>
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center border-b pb-5 mt-6" >Images to PDF Viewer</h1>
                <FileUpload
                    multiple={true}
                    
                    onChange={(files) => {
                        if (files && files.length > 0) {
                            setisLoading(true);
                            handleFiles(Array.from(files));
                        }
                    }}
                />

                {pdfUrl && (
                    <div className="border mt-4 rounded overflow-hidden h-[80vh] max-w-dvw mx-auto">
                        {
                            isLoading ?
                                <div className='flex justify-center items-center min-h-lvh'>
                                    <LoaderThree />

                                </div> : <iframe
                                    src={pdfUrl}
                                    width="100%"
                                    height="100%"
                                    className="w-full"
                                    title="PDF Preview"
                                />
                        }

                    </div>
                )}
            </div>

            {/* Extra Content */}

            {/* 📝 SEO Content */}
            <section className="max-w-4xl mx-auto px-4 space-y-8 py-12 text-gray-800 dark:text-gray-200">
                <h2 className="text-3xl font-bold text-center">Free Online Image to PDF Converter</h2>

                <p>
                    Welcome to our free online image to PDF converter tool. This powerful utility helps you
                    convert your JPG, PNG, and other image formats into a high-quality PDF document. Whether
                    you are a student trying to merge scanned notes, a professional organizing photos, or a
                    teacher preparing assignments, this tool can help you compile multiple images into a
                    single, easy-to-share PDF file without any software download or signup.
                </p>

                <p>
                    Our tool works entirely within your browser, using JavaScript and client-side processing.
                    This ensures complete privacy, fast performance, and zero file uploads to any third-party
                    servers. Just choose your images, and the PDF is created and displayed instantly on the
                    screen — ready to be viewed, saved, or printed.
                </p>
                <ArticalAds />
                <h3 className="text-2xl font-semibold pt-6">🖼️ Supported Image Formats</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>JPG / JPEG</li>
                    <li>PNG (Transparent and opaque)</li>
                    <li>GIF (single frame)</li>
                    <li>WebP and BMP (browser-dependent)</li>
                </ul>

                <h3 className="text-2xl font-semibold pt-6">💡 Why Use Image to PDF Conversion?</h3>
                <p>
                    Images are often great for capturing content, but when it comes to printing, archiving,
                    emailing, or sharing formal documents, PDFs are the universal format of choice. Merging
                    multiple images into a single PDF reduces clutter, ensures compatibility, and provides a
                    clean, structured document — great for assignments, eBooks, portfolios, and more.
                </p>

                <h3 className="text-2xl font-semibold pt-6">🎯 Common Use Cases</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Combine scanned handwritten notes into a PDF</li>
                    <li>Create a portfolio of design or art work</li>
                    <li>Convert receipts, bills, or documents into a PDF archive</li>
                    <li>Generate eBooks from a series of images</li>
                    <li>Submit scanned assignments or answer sheets online</li>
                </ul>

                <h3 className="text-2xl font-semibold pt-6">🚀 Fast & Secure Processing</h3>
                <p>
                    Your privacy matters. Our converter does not upload your files to any server. Everything
                    is handled within your browser using powerful JavaScript libraries like jsPDF. This
                    ensures that your files stay secure and private on your device. There is no risk of data
                    leaks or server-based tracking.
                </p>

                <h3 className="text-2xl font-semibold pt-6">📱 Mobile-Friendly & Cross-Browser</h3>
                <p>
                    Whether you are using Android, iOS, Windows, or macOS, our web app works smoothly on all
                    modern browsers including Chrome, Firefox, Safari, and Edge. The tool is responsive and
                    touch-optimized for mobile devices, making it perfect for on-the-go PDF creation.
                </p>

                <h3 className="text-2xl font-semibold pt-6">🌐 Works Offline (Optional PWA Support)</h3>
                <p>
                    This tool can also be converted into a Progressive Web App (PWA) allowing users to install
                    it and use it offline on supported devices. We aim to make it accessible for everyone,
                    even in areas with limited internet access. Simply add it to your home screen for a
                    native-like experience.
                </p>

                <h3 className="text-2xl font-semibold pt-6">🗣️ Language Support</h3>
                <p>
                    The PDF output preserves Unicode characters, so if your images contain regional language
                    text (like Hindi, Tamil, Bengali), they will appear correctly when captured properly. We
                    plan to add OCR + image-to-PDF functionality in the future for text-extracting PDFs too.
                </p>

                <h3 className="text-2xl font-semibold pt-6">🙋 Frequently Asked Questions (FAQs)</h3>
                <div className="space-y-3">
                    <p><strong>Q. Is this tool free?</strong><br />Yes, 100% free. No registration required.</p>
                    <p><strong>Q. Are my files stored online?</strong><br />No. All processing happens in your browser.</p>
                    <p><strong>Q. How many images can I upload?</strong><br />There is no fixed limit, but large files may slow down your browser.</p>
                    <p><strong>Q. Can I rearrange image order?</strong><br />Currently, no. We are working on adding that feature soon.</p>
                    <p><strong>Q. Can I download the PDF?</strong><br />Yes! Use the browser print dialog or add a save button manually.</p>
                </div>

                <h3 className="text-2xl font-semibold pt-6">📌 Coming Soon Features</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Drag-and-drop image reordering</li>
                    <li>Built-in compression for smaller PDFs</li>
                    <li>Cloud saving & auto-export</li>
                    <li>Watermark and signature tools</li>
                    <li>Dark mode for PDF previews</li>
                </ul>

                <p className="pt-4">
                    At Easy Tool Space, our goal is to empower users with free, powerful, and accessible tools
                    that simplify their digital lives. This image-to-PDF converter is just one of many
                    utilities we offer. Check out our other tools for OCR, text-to-speech, SQL generators, and
                    more — all free and ad-light.
                </p>
            </section>


        </>

    );
}
