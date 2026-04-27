import { blogAnalysisSchemaTable, blogScehmaTable, connectDB } from "../../models/db"

export async function InsertBlogToDB(title: string, description: string, emailId: string = "") {
    await connectDB()

    const result = await blogScehmaTable.create({
        title: title,
        description: description,
        emailId: emailId
    })

    return result
}


// export async function AnalyzeBlog(id: string) {

//     const analyzeBlogResult = await blogAnalysisSchemaTable(id)
//     return analyzeBlogResult;
// }


export async function FetchBlogFromDB() {
    await connectDB()

    const result = await blogScehmaTable.find();

    return result
}



export async function FetchBlogFromDBById(id: string) {
    await connectDB()

    const result = await blogScehmaTable.findById(id);

    return result
}

export async function DeleteBlogFromDb(id: String) {
    await connectDB()

    const result = await blogScehmaTable.deleteOne({ _id: id })

    return result
}


export async function UpdateBlogFromDb(id: string, params: any) {
    await connectDB()

    const result = await blogScehmaTable.updateOne({ _id: id }, { $set: params })
    return result
}
