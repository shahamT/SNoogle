// === React
// const { useState, useEffect, useRef } = React
// const { Routes, Route, Navigate, useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM

// === Services

// === Child Components



// ====== Component ======
// =======================

export function NoteUploadImg({ /* prop1, prop2 */ }) {
    // === Hooks
    console.log("sssssss")
    // === Effects

    // === Functions


// 2. בקובץ JS או ב‑React component שלך
const widget = cloudinary.createUploadWidget({
    cloudName: 'Yditvgrfxq',            // החליפי במפתחות שלך
    uploadPreset: 'YOUR_UNSIGNED_UPLOAD_PRESET',
    sources: ['local','url','camera'],       // אפשרויות בחירה
    multiple: false,                         // אם תרצי רק תמונה אחת
  }, (err, result) => {
    if (!err && result.event === 'success') {
      // מתבצעת העלאה, מקבלים URL בתוצאה
      document.getElementById('preview').src = result.info.secure_url;
      console.log('✔️ Uploaded to:', result.info.secure_url);
    }
  });
  
  // פותח את החלון בלחיצה על הכפתור
  document.getElementById('upload-btn')
    .addEventListener('click', () => widget.open(), false);
  





    // if (!data) return <div>Loading...</div>
    return (
        <section className="section-name">
            <h1>lalalala</h1>
            <script src="https://widget.cloudinary.com/v2.0/global/all.js"></script>

            <button id="upload-btn">Upload Image</button>
            <img id="preview" src="" alt="uploaded image" />




            
        </section>
    )
}