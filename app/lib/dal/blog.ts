import { blogAnalysisSchemaTable, blogScehmaTable, connectDB, questionLogSchemaTable } from "../../models/db"

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

export async function RewriteBlogInDB(id: string, highlightedText: string, aiRewriteResponse: string) {
    await connectDB()

    // Step 1: Fetch the current blog
    const blog = await blogScehmaTable.findById(id)
    if (!blog) throw new Error("Blog not found")

    // Step 2: Replace the highlighted text in JavaScript (simple & reliable)
    const updatedDescription = blog.description.replace(highlightedText, aiRewriteResponse)

    // Step 3: Save back with a normal $set (no pipeline needed)
    const result = await blogScehmaTable.updateOne(
        { _id: id },
        { $set: { description: updatedDescription } }
    )

    return result
}


export async function FetchBlogFromDBById(id: string) {
    await connectDB()

    const result = await blogScehmaTable.findById(id);

    return result
}

export async function FetchRecentQuestionsAndAnswersFromDB(id: string) {
    await connectDB()

    const result = await questionLogSchemaTable.find();

    return result
}

export async function InsertBlogQuestionsAndAnswersToDB(userQuestion: string, aiResponse: String, emailId?: string) {
    await connectDB()

    const result = await questionLogSchemaTable.create({
        emailId: emailId,
        userQuestion: userQuestion,
        aiResponse: aiResponse,
    });

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
