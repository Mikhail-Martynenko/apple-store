import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="5" y="261" rx="22" ry="22" width="248" height="24"/>
        <rect x="7" y="299" rx="13" ry="13" width="240" height="74"/>
        <rect x="4" y="395" rx="8" ry="8" width="100" height="28"/>
        <rect x="113" y="386" rx="29" ry="29" width="132" height="40"/>
        <rect x="26" y="8" rx="0" ry="0" width="217" height="234"/>
    </ContentLoader>
)
export default Skeleton