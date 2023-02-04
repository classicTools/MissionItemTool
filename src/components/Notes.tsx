// import DOMPurify from 'dompurify'
// import XButton from './XButton'

// export type NoteType = 'warning' | 'success' | 'error' | 'info'

// export const noteType = {
//     warning: 'warning',
//     success: 'success',
//     error: 'error',
//     info: 'info',
// }

// export const Notes = ({ notes, stickyNotes, onDelete }) => {
//     let key = 0
//     // uniqufying stickyNotes in App.js doesn't work. Do it here.
//     let uniqueMessages = [...new Set(stickyNotes.map(s => s.note))]
//     let uniqueStickyNotes = uniqueMessages.map(u => stickyNotes.find(s => s.note === u))

//     return (
//         <div className='divNoteContainer'>
//             <div className='divNotes'>
//                 {notes.map(n => {
//                     key++
//                     return (
//                         <div
//                             className={'divNote ' + n.type}
//                             key={key}
//                             dangerouslySetInnerHTML={{
//                                 __html: DOMPurify.sanitize(n.note),
//                             }}
//                         ></div>
//                     )
//                 })}
//             </div>
//             <div className='divStickyNotes'>
//                 {uniqueStickyNotes.map(n => {
//                     key++
//                     return (
//                         <div className={'divStickyNote ' + n.type} key={key}>
//                             <div
//                                 className='stickyNoteMessage'
//                                 dangerouslySetInnerHTML={{
//                                     __html: DOMPurify.sanitize(n.note),
//                                 }}
//                             ></div>
//                             <XButton className='btnDeleteStickyNote' onX={() => onDelete(n.note)} />
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }
