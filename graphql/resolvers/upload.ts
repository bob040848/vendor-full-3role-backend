// graphql/resolvers/upload.ts
import { supabaseServer } from '@/lib/supabase/server'

export const resolvers = {
  Mutation: {
    async uploadFile(_: any, { base64, filename }: any, ctx: any) {
      const buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64')

      const { error } = await supabaseServer.storage
        .from('uploads')
        .upload(`user-files/${filename}`, buffer, {
          contentType: 'image/png',
          upsert: true,
        })

      if (error) throw new Error(error.message)

      return {
        success: true,
        url: `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/user-files/${filename}`,
      }
    },
  },
}
export default resolvers