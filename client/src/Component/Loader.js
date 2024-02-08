
export default function Loader({ loading }) {
    if (loading) {
        return (
             <div className="d-flex flex-column justify-center-center align-items-center" style={{ position: "fixed", minHeight:"100vh", minWidth:"100%", top:"0px", left:"0px", zIndex:10, background:"#fff"}}>
           
           <div className="center-body">
                <div className="loader-circle-9">Loading
                    <span></span>
                </div>
            </div>

             </div>

        )
    }
    return <></>
}