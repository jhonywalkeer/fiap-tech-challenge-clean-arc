/*
  Warnings:

  - You are about to drop the column `category` on the `product` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- InsertData

INSERT INTO "category" ("id", "name", "description", "created_at", "updated_at") VALUES ('clwo9jgii000008mkg7os77c8', 'Lanche', 'Perfeito para matar a fome em qualquer momento do dia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "category" ("id", "name", "description", "created_at", "updated_at") VALUES ('clwo9oseo000308mkco8n29lk', 'Acompanhamento',
'Aquilo que não pode faltar pedido, o parceiro perfeito', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "category" ("id", "name", "description", "created_at", "updated_at") VALUES ('clwo9lczp000108mkhloy2zrz', 'Bebida', 'Refrescante e saborosa para qualquer ocasião', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "category" ("id", "name", "description", "created_at", "updated_at") VALUES ('clwo9lrvw000208mkfv954z2t', 'Sobremesa', 'Deliciosas sobremesas para fechar ou matar a vontade com chave de ouro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
