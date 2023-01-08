import nodemailer from 'nodemailer';

export class Mailer {
    private transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT!),
        secure: false,
        auth: {
            user: process.env.EMAIL_HOST_USER,
            pass: process.env.EMAIL_HOST_PASSWORD
        }
    })

    public constructor() {
        this.transporter.verify().then(() => {
            console.log('Ready for send emails')
        })
    }

    private compileTemplate(template: string, data: { id: string, value: string }[]): string {
        const doc = new DOMParser().parseFromString(template, 'text/html');
        data.forEach(({id, value}) => {
            const element = doc.getElementById(id);
            if (element) {
                element.innerHTML = value
            }
        })
        return doc.documentElement.outerHTML
    }

    public async sendEmail(to: string, subject: string, template: string, data: { id: string, value: string }[]): Promise<void> {
        const html = this.compileTemplate(template, data)
        await this.transporter.sendMail({
            from: "Mailer service",
            to,
            subject,
            html
        })
    }

    public async sendBulkEmail(
        subject: string,
        template: string,
        mapping: {
            to: string,
            data: {
                id: string,
                value: string
            }[]
        }[]): Promise<void> {
        await Promise.all(mapping.map(async ({to, data}) => {
            await this.sendEmail(to, subject, template, data)
        }))
    }
}